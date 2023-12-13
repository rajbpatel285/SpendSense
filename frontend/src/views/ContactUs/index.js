import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { Alerts } from "../../utils/Alert";

const ContactUsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Alert Start
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType,
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };
  // Alert End

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      axios
        .post("/addContactUsRecord", { name, email, message })
        .then((response) => {
          console.log("Form submitted:", { name, email, message });
          setName("");
          setEmail("");
          setMessage("");
          setAlertMessage(`Submitted`);
          setAlertType("success");
          snackbarOpen();
        })
        .catch((error) => {
          console.error(error);
          setAlertMessage("Something went wrong, Please try again!");
          setAlertType("error");
          snackbarOpen();
        });
    } else {
      console.log("Validation error: Please fill in all fields.");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="left" sx={{ mt: 4, mb: 2 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" align="left" sx={{ mt: 4, mb: 3 }}>
        You can contact us by sending in your queries or report any issues by
        filling out the following details. We will contact you as soon as we
        receive your queries.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              fullWidth
              required
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {snackbar && (
        <Alerts
          alertObj={alertObj}
          snackbar={snackbar}
          snackbarClose={snackbarClose}
        />
      )}
    </Container>
  );
};

export default ContactUsPage;
