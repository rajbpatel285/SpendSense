import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
} from "@mui/material";
import axios from "axios";

const MemberSearchModal = ({ open, handleClose, handleGroupSubmit }) => {
  const loggedInUserId = sessionStorage.getItem("userId");
  const [groupName, setGroupName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  const [selectedMember, setSelectedMember] = useState("");

  const [existingMembers, setExistingMembers] = useState([]);

  useEffect(() => {
    getFriends();
  });

  const getFriends = () => {
    axios
      .post("/users/getFriends", {
        userId: loggedInUserId,
      })
      .then((res) => {
        if (res.data.length > 0) {
          setExistingMembers(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleMemberChange = (event) => {
    const { value } = event.target;
    setSelectedMember(value);
  };

  const handleAddMember = () => {
    if (selectedMember) {
      const existingMember = members.find(
        (member) => member.id === selectedMember
      );
      if (existingMember) {
        setError("Member already added");
        return;
      }

      const memberDetails = existingMembers.find(
        (obj) => obj.id === selectedMember
      );
      console.log(memberDetails);
      setMembers([...members, memberDetails]);

      setMemberEmail("");
      setError("");
    }
  };

  const handleRemoveMember = (email) => {
    setMembers(members.filter((member) => member.email !== email));
  };

  const handleGroupSubmitClick = () => {
    if (groupName && members.length > 0) {
      //todo: send their full names
      let addedMembers = [];
      members.forEach((obj) => {
        addedMembers.push(obj.id);
      });
      addedMembers.push(loggedInUserId);
      handleGroupSubmit({ name: groupName, members: addedMembers });
      setGroupName("");
      setMembers([]);
      setError("");
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          height: "100%",
          outline: "none",
        }}
      >
        <Grid
          item
          xs={10}
          sm={8}
          md={6}
          lg={4}
          sx={{ bgcolor: "background.paper", p: 3, borderRadius: "8px" }}
        >
          <Typography variant="h6" style={{ marginBottom: "5%" }}>
            New Group
          </Typography>
          <TextField
            label="Group Name"
            variant="outlined"
            fullWidth
            value={groupName}
            onChange={handleGroupNameChange}
            style={{ marginBottom: "3%" }}
          />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <FormControl fullWidth style={{ marginTop: "5%" }}>
                <InputLabel id="group-label">Select a member</InputLabel>
                <Select
                  labelId="group-label"
                  id="group-select"
                  label="Select a member"
                  value={selectedMember}
                  onChange={handleMemberChange}
                >
                  {existingMembers.map((member) => (
                    <MenuItem key={member.id} value={member.id}>
                      {member.firstname + " " + member.lastname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMember}
                sx={{ mt: 2 }}
                fullWidth
                style={{
                  height: "56px",
                }}
              >
                Add Member
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {members.length > 0 && (
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <Typography style={{ paddingLeft: "1%" }}>
                  Added members:
                </Typography>
              </Grid>

              {members.length > 0 &&
                members.map((member, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={member.firstname + " " + member.lastname}
                      onDelete={() => handleRemoveMember(member.email)}
                    />
                  </Grid>
                ))}
            </Grid>
          )}
          <Grid
            container
            spacing={2}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "3%",
            }}
          >
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                type="onClose"
                sx={{ mt: 3 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGroupSubmitClick}
                disabled={!groupName || members.length === 0}
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default MemberSearchModal;
