import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Chip,
  Avatar,
} from "@mui/material";
import axios from "axios";

const ExpenseSplitter = ({
  groups,
  handleOpenModal,
  handleExpenseSubmitted,
}) => {
  console.log(groups);
  const currentUser = sessionStorage.getItem("userId");

  const [selectedGroup, setSelectedGroup] = useState("");
  const [splitOption, setSplitOption] = useState("equal");
  const [proportions, setProportions] = useState({});
  const [splitAmounts, setSplitAmounts] = useState([]);
  const [proportionError, setProportionError] = useState(false);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [disableSubmit, setDisableSubmit] = useState(true);

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
    setSplitAmounts([]);
  };

  const handleSplitOptionChange = (event) => {
    setSplitOption(event.target.value);
    setProportions({});
    setSplitAmounts([]);
  };

  const handleProportionChange = (event, member) => {
    const { value } = event.target;
    setProportions((prevProportions) => ({
      ...prevProportions,
      [member._id]: value !== "" ? parseFloat(value) : 0,
    }));
  };

  const handleCreateGroup = () => {
    handleOpenModal();
  };

  const handleSplit = () => {
    const totalExpense = amount;
    const group = groups.find((grp) => grp._id === selectedGroup);
    if (!group) return;

    if (splitOption === "percentage") {
      let totalProportion = 0;
      Object.values(proportions).forEach((value) => {
        totalProportion += value;
      });

      if (totalProportion !== 100) {
        setProportionError(true);
        console.log("Total proportion should be 100%");
        return;
      } else {
        setProportionError(false);

        const splitAmounts = group.memberDetails.map((member) => {
          const memberId = member._id;
          const proportion = proportions[member._id];
          const amount = (proportion / 100) * totalExpense;
          return { memberId, amount };
        });

        setSplitAmounts(splitAmounts);
      }
    } else {
      const splitAmounts = group.memberDetails.map((member) => {
        const memberId = member._id;
        const proportion = 100 / group.memberDetails.length;
        const amount = (proportion / 100) * totalExpense;
        return { memberId, amount };
      });

      setSplitAmounts(splitAmounts);
    }
  };

  const getNameInitials = (name) => {
    const names = name.split(" ");

    if (names.length === 1) {
      return names[0].charAt(0);
    } else if (names.length > 1) {
      const firstNameInitial = names[0].charAt(0);
      const lastNameInitial = names[names.length - 1].charAt(0);
      return `${firstNameInitial}${lastNameInitial}`;
    }

    return "";
  };

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: getNameInitials(name),
    };
  };

  const renderMembers = () => {
    const group = groups.find((grp) => grp._id === selectedGroup);
    if (!group) return null;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Members:</Typography>
        </Grid>
        {group.memberDetails.map((member) => (
          <Grid key={member._id} item>
            {/* {member} */}
            <Chip
              avatar={
                <Avatar
                  {...stringAvatar(member.name)}
                  style={{ color: "white" }}
                ></Avatar>
              }
              label={
                currentUser === member._id
                  ? member.name + " (You)"
                  : member.name
              }
              size="large"
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderSplitOption = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Split Option:</Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <FormControl fullWidth>
            <InputLabel id="split-option-label">Split Option</InputLabel>
            <Select
              labelId="split-option-label"
              id="split-option-select"
              value={splitOption}
              onChange={handleSplitOptionChange}
              label="Split Option"
            >
              <MenuItem value="equal">Equally</MenuItem>
              <MenuItem value="percentage">Percentage</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Button
            variant="contained"
            onClick={handleSplit}
            fullWidth
            style={{ height: "56px" }}
          >
            Split Expense
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderProportions = () => {
    if (splitOption === "percentage") {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Proportions:</Typography>
          </Grid>
          {groups.map((group) => {
            if (group._id === selectedGroup) {
              return group.memberDetails.map((member) => (
                <Grid key={member._id} item xs={12} sm={6}>
                  <TextField
                    label={member.name}
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={proportions[member._id] || ""}
                    onChange={(event) => handleProportionChange(event, member)}
                    fullWidth
                  />
                </Grid>
              ));
            }
            return null;
          })}
          {proportionError && (
            <>
              <Grid item xs={12}>
                <span style={{ fontStyle: "italic", color: "red" }}>
                  Total proportion should be 100%
                </span>
              </Grid>
            </>
          )}
        </Grid>
      );
    }
    return null;
  };

  const renderSplitAmounts = () => {
    if (splitAmounts.length === 0) return null;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Split Amounts:</Typography>
        </Grid>
        {splitAmounts.map(({ memberId, amount }) => (
          <Grid key={memberId} item xs={12} sm={6}>
            {`${
              currentUser === memberId
                ? groups
                    .find((obj) => obj._id === selectedGroup)
                    .memberDetails.find((obj) => obj._id === memberId).name +
                  " (You)"
                : groups
                    .find((obj) => obj._id === selectedGroup)
                    .memberDetails.find((obj) => obj._id === memberId).name
            } : `}
            <strong>${amount.toFixed(2)}</strong>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderExpenseInput = () => {
    const handleDateChange = (event) => {
      setDate(event.target.value);
    };

    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };

    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
    };

    const handleNoteChange = (event) => {
      setNote(event.target.value);
    };

    return (
      <>
        <TextField
          type="date"
          value={date}
          onChange={handleDateChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            value={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="Grocery">Grocery</MenuItem>
            <MenuItem value="Restaurant">Restaurant</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Transportation">Transportation</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Note"
          multiline
          rows={4}
          value={note}
          onChange={handleNoteChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </>
    );
  };

  const handleSubmit = () => {
    let paidByUserId = currentUser;
    const groupExpense = {
      group: selectedGroup,
      split: splitOption,
      proportions,
      splitAmounts,
      date,
      amount,
      category,
      note,
      paidByUserId,
    };
    axios
      .post("/addGroupTransaction", groupExpense)
      .then((result) => {
        console.log("success");
        handleExpenseSubmitted();
      })
      .catch((error) => {
        console.log("failure");
      });
  };

  useEffect(() => {
    verifyDetails();
  }, [selectedGroup, splitOption, splitAmounts, date, amount, category, note]);

  const verifyDetails = () => {
    if (
      selectedGroup &&
      splitOption &&
      splitAmounts.length &&
      date &&
      amount &&
      category &&
      note
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  };

  return (
    <>
      <Box style={{}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {renderExpenseInput()}
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <FormControl fullWidth>
              <InputLabel id="group-label">Select a Group</InputLabel>
              <Select
                labelId="group-label"
                id="group-select"
                label="Select a Group"
                value={selectedGroup}
                onChange={handleGroupChange}
              >
                {groups.map((group) => (
                  <MenuItem key={group._id} value={group._id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Button
              variant="outlined"
              onClick={handleCreateGroup}
              fullWidth
              style={{ height: "56px" }}
            >
              New Group
            </Button>
          </Grid>
        </Grid>
      </Box>
      {selectedGroup && (
        <>
          <Box style={{ paddingTop: "3%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12} md={12} sm={12}>
                {renderMembers()}
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                md={12}
                sm={12}
                style={{ paddingTop: "5%" }}
              >
                {renderSplitOption()}
              </Grid>
              <Grid
                item
                xs={12}
                lg={12}
                md={12}
                sm={12}
                style={{ paddingTop: "2%" }}
              >
                {renderProportions()}
              </Grid>
            </Grid>
          </Box>
          <Box style={{ paddingTop: "3%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={12} md={12} sm={12}>
                {renderSplitAmounts()}
              </Grid>
              <Grid item xs={12} style={{ paddingTop: "5%" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={disableSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default ExpenseSplitter;
