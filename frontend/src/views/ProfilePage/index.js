import React, { useState, useEffect } from "react";
import {
  Avatar,
  CardHeader,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Alerts } from "../../utils/Alert";

function UserProfile() {
  const [usersList, setUsersList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    friends: [],
  });
  const [loading, setLoading] = useState(true);
  const [emailError, setEmailError] = useState("");

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

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/userdetails", {
        userId: window.sessionStorage.getItem("userId"),
      });
      const user = response.data;
      console.log(response.data);
      setUserData({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        friends: user.friends,
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Error fetching user data. Server responded with status:",
          error.response.status
        );
        console.error("Error details:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
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

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setSelectedFriend(email);
    setEmailError(isEmailValid(email) ? "" : "Invalid email format");
  };

  useEffect(() => {
    getUserDetails();

    setLoading(false);
  }, []);

  useEffect(() => {
    axios
      .get("/getusers")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleAddFriend = () => {
    if (!isEmailValid(selectedFriend)) {
      setEmailError("Invalid email format");
      return;
    }

    const isEmailExists = usersList.some(
      (user) => user.email === selectedFriend
    );

    if (!isEmailExists) {
      setAlertMessage("User is not on SpendSense.");
      setAlertType("error");
      snackbarOpen();
      return;
    }

    const isAlreadyFriend = userData.friends.some(
      (friend) => friend.email === selectedFriend
    );
    console.log(selectedFriend);

    if (isAlreadyFriend) {
      setAlertMessage("Selected friend is already a friend.");
      setAlertType("error");
      snackbarOpen();
    } else {
      // Prevent adding themselves as a friend
      if (selectedFriend === userData.email) {
        setAlertMessage("You cannot add yourself as a friend.");
        setAlertType("error");
        snackbarOpen();
        return;
      }

      axios
        .post("/addfriend", {
          userId: window.sessionStorage.getItem("userId"),
          friendId: usersList.find((obj) => obj.email === selectedFriend)._id,
        })
        .then((response) => {
          console.log(response.data);
          getUserDetails();
          // Clear the selectedFriend state
          setSelectedFriend("");
        })
        .catch((error) => {
          console.error("Error adding friend:", error);
        });
    }
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={4} style={{ paddingTop: 0 }}>
          <Card style={{ height: "100%" }}>
            <CardMedia
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "2%",
              }}
            >
              <Avatar
                style={{ height: "150px", width: "150px" }}
                src="/broken-image.jpg"
              ></Avatar>
            </CardMedia>

            <CardContent>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Welcome {userData.firstname}
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`First Name: ${userData.firstname}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Last Name: ${userData.lastname}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Email: ${userData.email}`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#262626",
            padding: "3%",
          }}
        >
          <div
            style={{
              fontWeight: 100,
              fontSize: "1.5rem",
              color: "white",
            }}
          >
            Your Friends
          </div>
          <div
            className="user-cards"
            style={{
              textAlign: "center",
              marginTop: "20px",
              alignItems: "center",
              overflowY: "auto",
              maxHeight: "500px",
              width: "100%",
              overflowWrap: "anywhere",
            }}
          >
            <Grid container spacing={2}>
              {userData.friends.map((user, index) => (
                <>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card key={index} sx={{ maxWidth: 345 }}>
                      <CardHeader
                        avatar={
                          <Avatar
                            sx={{ height: 200, width: 200 }}
                            {...stringAvatar(user.firstname + user.lastname)}
                            style={{ color: "white" }}
                          ></Avatar>
                        }
                        title={user.firstname}
                        subheader={user.email}
                      />
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>
          </div>
        </Grid>

        <Grid
          container
          spacing={2}
          // justifyContent="center"
          style={{ paddingTop: "20px" }}
        >
          <Grid item xs={12} md={6} lg={8}>
            <TextField
              fullWidth
              label="Enter an email address"
              value={selectedFriend}
              onChange={handleEmailChange} // Use handleEmailChange for input change
              variant="outlined"
              error={Boolean(emailError)}
              helperText={emailError}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Button
              onClick={handleAddFriend}
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#262626",
                color: "white",
                height: "56px",
              }}
              disabled={!selectedFriend}
              size="large"
            >
              Click to add friend
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {snackbar && (
        <Alerts
          alertObj={alertObj}
          snackbar={snackbar}
          snackbarClose={snackbarClose}
        />
      )}
    </Container>
  );
}

export default UserProfile;
