import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";

const defaultTheme = createTheme();

export default function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
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

  const handleOTPChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    setOtpError("");
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordError("");
    if (newPassword !== value) {
      setPasswordError("Passwords do not match.");
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post("/users/requestPasswordReset", {
        email,
      });
      if (response.status === 200) {
        setResetSuccess(true);
      }
    } catch (error) {
      setResetSuccess(false);
      setEmailError("User with this email not found.");
    }
  };

  const handleVerifyOTP = async (event) => {
    event.preventDefault();

    if (!otp) {
      setOtpError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post("/users/verifyPasswordResetOTP", {
        email,
        otp,
      });
      if (response.status === 200) {
        setOtpVerified(true);
      }
    } catch (error) {
      setOtpVerified(false);
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordUpdateSuccess = () => {
    setPasswordUpdated(true);
    setResetSuccess(false);
    setOtpVerified(false);
    setNewPassword("");
    setConfirmPassword("");
    resetErrors();

    // Show the success message for 2 seconds and then navigate to the login page
    setTimeout(() => {
      setPasswordUpdated(false);
      navigate("/");
    }, 1500);
  };

  const handlePasswordUpdateFailure = () => {
    setPasswordUpdated(false);
    setNewPassword("");
    setConfirmPassword("");
    resetErrors();
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setPasswordError("Please enter both passwords.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    // Password validation using regular expressions
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    const params = {
      email,
      password: newPassword,
    };

    try {
      const response = await axios.post("/users/updatePassword", params);
      if (response.status === 200) {
        handlePasswordUpdateSuccess();
      } else {
        handlePasswordUpdateFailure();
      }
    } catch (error) {
      handlePasswordUpdateFailure();
    }
  };

  const resetErrors = () => {
    setEmailError("");
    setOtpError("");
    setPasswordError("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: "black",
                fontSize: "1.5rem",
                fontWeight: 100,
                letterSpacing: "0.3rem",
                mb: 4,
              }}
            >
              Reset Password
            </Typography>

            {!passwordUpdated && !resetSuccess && !otpVerified && (
              <Box
                component="form"
                noValidate
                onSubmit={handleResetPassword}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#1976D2",
                    color: "white",
                  }}
                >
                  Send OTP
                </Button>
                <Typography
                  variant="body2"
                  onClick={() => navigate("/")}
                  sx={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                    textAlign: "center",
                    pt: 2,
                  }}
                >
                  Go back to Login
                </Typography>
              </Box>
            )}

            {resetSuccess && !otpVerified && (
              <Box
                component="form"
                noValidate
                onSubmit={handleVerifyOTP}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  name="otp"
                  autoComplete="off"
                  autoFocus
                  value={otp}
                  onChange={handleOTPChange}
                  error={!!otpError}
                  helperText={otpError}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#1976D2",
                    color: "white",
                  }}
                >
                  Verify OTP
                </Button>
                <Typography
                  variant="body2"
                  onClick={() => setResetSuccess(false)}
                  sx={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                    textAlign: "center",
                    pt: 2,
                  }}
                >
                  Resend OTP
                </Typography>
              </Box>
            )}

            {passwordUpdated && (
              <Typography variant="body1" sx={{ color: "green", mt: 2 }}>
                Password updated successfully.
              </Typography>
            )}

            {resetSuccess && otpVerified && (
              <Box
                component="form"
                noValidate
                onSubmit={handleUpdatePassword}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  autoComplete="new-password"
                  autoFocus
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          color="primary"
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!passwordError}
                  helperText={
                    newPassword !== confirmPassword
                      ? "Passwords do not match."
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          color="primary"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#1976D2",
                    color: "white",
                  }}
                >
                  Update Password
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
