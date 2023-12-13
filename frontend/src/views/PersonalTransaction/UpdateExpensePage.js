import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const UpdateExpensePage = ({ selectedDate }) => {
  const location = useLocation();
  const transactionId = location.state.transactionId;
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState(null);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/personalTransaction/" + transactionId)
      .then((response) => {
        setAmount(response.data.transaction.amount);
        setCategory(response.data.transaction.category);
        setNote(response.data.transaction.note);
        setDate(response.data.transaction.date.split("T")[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    if (selectedDate) {
      setDate(moment(selectedDate).format("YYYY-MM-DD"));
    }
  }, [selectedDate]);

  const userId = sessionStorage.getItem("userId");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("/personalTransaction/update/" + transactionId, {
        date,
        amount,
        category,
        note,
        typeOfTransaction: "Expense",
        userId,
      })
      .then((response) => {
        console.log("Expense transaction updated:", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setAmount(0);
    setCategory("");
    setNote("");
    setDate("");
    navigate("/personal");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="page-container ExpensePage">
      <h1 style={{ overflowWrap: "anywhere" }}>Expense</h1>

      <Slider {...settings}>
        <div>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDateChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    type="number"
                    label="Amount"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <Select
                    id="category"
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
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    type="text"
                    label={note === "" ? "Note" : ""}
                    id="note"
                    value={note}
                    onChange={handleNoteChange}
                    multiline
                    rows={4}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Update Expense
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Slider>
    </div>
  );
};

export default UpdateExpensePage;
