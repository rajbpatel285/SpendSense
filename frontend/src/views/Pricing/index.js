// PricingPage.js
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import styles from "./styles.css"; // Import the CSS file
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Paper } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
const PricingPage = () => {
  const navigate = useNavigate();
  const [yearly, setYearly] = useState(false);
  const yearlyValue = "107.99";
  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {/* <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h5">SPENDSENSE</Typography>
        </Grid> */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2">Pricing Options</Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", padding: "2%" }}>
          <Typography variant="h6">
            Switch to a commercial plan to access advanced features & technical
            support.
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center", padding: "2%" }}>
          Monthly
          <Switch
            onChange={() => {
              setYearly(!yearly);
            }}
          />
          Yearly{" "}
        </Grid>
        <Grid item xs={0} md={2} sx={{ textAlign: "center" }}></Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Card className="card-free" sx={{ padding: "20px 0" }}>
            <Typography variant="h6">COMMUNITY</Typography>
            <Typography
              variant="h3"
              style={{ display: "inline-block", padding: "3%" }}
            >
              Free
            </Typography>{" "}
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              Personal Expense Tracker
            </Typography>
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              Shared Expense Manager
            </Typography>
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              Manage Group Members
            </Typography>
            <Typography
              variant="h6"
              sx={{ textDecoration: "line-through" }}
              className="feature-spacing"
            >
              <CloseIcon color="secondary" />
              View Expense Trends
            </Typography>
            <Typography
              variant="h6"
              sx={{ textDecoration: "line-through" }}
              className="feature-spacing"
            >
              <CloseIcon color="secondary" />
              Download Monthly Statements
            </Typography>
            <Button
              variant="outlined"
              className="pricing-button"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact Us
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Card className="card-pro" sx={{ padding: "20px 0" }}>
            <Typography variant="h6">PRO</Typography>
            <div style={{ padding: "3%" }}>
              <Typography variant="h3" style={{ display: "inline-block" }}>
                {yearly ? "$107.99" : "$9.99"}
              </Typography>{" "}
              <Typography variant="h5" style={{ display: "inline-block" }}>
                {" "}
                {yearly ? "/ year" : "/ month"}
              </Typography>
              {yearly && (
                <Typography
                  variant="h6"
                  style={{
                    display: "inline-block",
                    color: "#eeeeee",
                  }}
                >
                  (10% off)
                </Typography>
              )}
            </div>
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              Personal Expense Tracker
            </Typography>
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              Shared Expense Manager
            </Typography>
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              Manage Group Members
            </Typography>
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              View Expense Trends
            </Typography>
            <Typography variant="h6" className="feature-spacing">
              <DoneIcon color="primary" />
              Download Monthly Statements
            </Typography>
            <Button
              variant="outlined"
              className="pricing-button"
              onClick={() => {
                navigate("/contact");
              }}
            >
              Contact Us
            </Button>
          </Card>
        </Grid>
        <Grid item xs={0} md={2} sx={{ textAlign: "center" }}></Grid>
      </Grid>
    </>
  );
};

export default PricingPage;
