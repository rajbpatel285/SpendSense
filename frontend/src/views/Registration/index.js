import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import logo from "../../assets/1.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const defaultTheme = createTheme();

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateName = (name) => /^[a-zA-Z]+$/.test(name);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

  const validatePassword = (password, confirmPassword) => {
    const isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
        password
      );
    const doPasswordsMatch = password === confirmPassword;

    setPasswordError(
      isPasswordValid
        ? ""
        : "Passwords must contain at least 8 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    );
    setConfirmPasswordError(doPasswordsMatch ? "" : "Passwords don't match");

    return isPasswordValid && doPasswordsMatch;
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    if (value && !validateName(value)) {
      setFormError("Please enter only letters");
    } else {
      setFormError("");
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    if (value && !validateName(value)) {
      setFormError("Please enter only letters");
    } else {
      setFormError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(value === password ? "" : "Passwords don't match");

    validatePassword(password, value);

    const isFormValid =
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      value === password &&
      validatePassword(password, value);

    if (isFormValid) {
      setFormError("");
    } else {
      setFormError("Please fill in all details correctly.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmPassword &&
      validateName(firstName) &&
      validateName(lastName) &&
      validateEmail(email) &&
      validatePassword(password, confirmPassword)
    ) {
      try {
        const param = {
          firstName,
          lastName,
          email,
          password,
        };

        const response = await axios.post("/users/register", param);

        if (response.status === 200) {
          setRegistrationError("Registration successful");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          setRegistrationError("Registration failed. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setRegistrationError(
            "Email already exists. Please use a different email."
          );
        } else {
          setRegistrationError("Registration failed. Please try again.");
        }
      }
    } else {
      setFormError("Please fill in all details correctly.");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ minHeight: "100vh", backgroundColor: "#0f0f0f" }}
      >
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          lg={7}
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "white",
            paddingTop: "5%",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          component={Paper}
          square
          sx={{
            backgroundColor: "white",
            boxShadow: "none",
            color: "black",
            padding: "5%",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ fontSize: "1.5rem", fontWeight: 100, textAlign: "center" }}
          >
            WELCOME!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1, boxShadow: "none" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={handleFirstNameChange}
              error={firstName && !validateName(firstName)}
              helperText={formError}
              InputProps={{
                style: {
                  color: "black",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputOutlineProps={{
                style: {
                  borderColor: "white",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={handleLastNameChange}
              error={lastName && !validateName(lastName)}
              helperText={formError}
              InputProps={{
                style: {
                  color: "black",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputOutlineProps={{
                style: {
                  borderColor: "white",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
              InputProps={{
                style: {
                  color: "black",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputOutlineProps={{
                style: {
                  borderColor: "white",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                style: {
                  color: "black",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      color="inherit"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputOutlineProps={{
                style: {
                  borderColor: "white",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              InputProps={{
                style: {
                  color: "black",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      color="inherit"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  color: "black",
                },
              }}
              InputOutlineProps={{
                style: {
                  borderColor: confirmPasswordError ? "red" : "white",
                },
              }}
            />
            {formError && (
              <Typography variant="body2" color="error" align="center">
                {formError}
              </Typography>
            )}
            {registrationError && (
              <Typography variant="body2" color="error" align="center">
                {registrationError}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "black" }}>Already have an account? </span>
              <span
                variant="body2"
                onClick={() => navigate("/")}
                style={{
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Sign In
              </span>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
