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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import logo from "../../assets/1.png";
import { setSessionStorage } from "./auth";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState("");

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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setLoginError("Please enter a valid email");
      return;
    }

    const params = {
      email,
      password,
    };

    axios
      .post("/users/login", params)
      .then((response) => {
        const { userId, token, expiresIn } = response.data;

        setUserId(userId);

        setSessionStorage(userId, token, expiresIn);

        if (response.status === 200) {
          setLoginError("Login successful");
          setTimeout(() => {
            navigate("/homepage");
          }, 500);
        } else {
          setLoginError("Invalid Credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginError("Invalid Credentials. Please try again");
      });
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h5"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 100,
                  textAlign: "center",
                }}
              >
                LOGIN
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"} // Show password or hide it
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="current-password"
                  InputProps={{
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
                  Sign In
                </Button>
                {loginError && (
                  <Typography variant="body2" color="error" align="center">
                    {loginError}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  onClick={() => navigate("/passwordreset")}
                  sx={{
                    textDecoration: "none",
                    color: "blue",
                    cursor: "pointer",
                    textAlign: "center",
                    paddingTop: "2%",
                  }}
                >
                  Forgot Password
                </Typography>
                <div style={{ textAlign: "center" }}>
                  <span style={{ color: "black" }}>
                    Don't have an account?{" "}
                  </span>
                  <span
                    variant="body2"
                    onClick={() => navigate("/register")}
                    style={{
                      textDecoration: "none",
                      color: "blue",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Sign Up
                  </span>
                </div>
                <Typography
                  sx={{
                    marginTop: "80px",
                    color: "blue",
                    textAlign: "center",
                  }}
                ></Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
