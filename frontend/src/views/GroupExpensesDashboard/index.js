import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/AddTransaction.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Alerts } from "../../utils/Alert";
import { CustomBreadcrumbs } from "../../utils/Breadcrums";
const GroupExpenseDashboard = ({ width = "100%" }) => {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [expensesData, setExpensesData] = useState(null);
  const [totalOwe, setTotalOwe] = useState(null);
  const [totalOwed, setTotalOwed] = useState(null);

  const userId = sessionStorage.getItem("userId");

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

  const handleSettleUp = (entry) => {
    axios
      .post(`/settleUp`, {
        id: entry.id,
      })
      .then((resp) => {
        if (resp.status === 200) {
          setAlertMessage(
            `Settled up with ${entry.name} for $${entry.amount} in group ${entry.group}`
          );
          setAlertType("success");
          snackbarOpen();
          fetchExpenseData();
        }
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.message);
        console.log(error.response);
        setAlertMessage("Something went wrong, Please try again!");
        setAlertType("error");
        snackbarOpen();
      });
  };

  const fetchExpenseData = async () => {
    try {
      const response = await axios.get(`/userAmountData/${userId}`);
      setExpensesData(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    if (expensesData) {
      const totalOweTemp = expensesData.whatIOwe.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      const totalOwedTemp = expensesData.whatImOwed.reduce(
        (total, expense) => total + expense.amount,
        0
      );
      setTotalOwe(totalOweTemp);
      setTotalOwed(totalOwedTemp);
    }
  }, [expensesData]);

  useEffect(() => {
    fetchExpenseData();
  }, []);

  return (
    <>
      <CustomBreadcrumbs
        pages={[
          { text: "Home", link: "/homepage" },
          { text: "Group - Home", link: "/groupexpensehomepage" },
          { text: "Dashboard", link: "/groupExpenseDashboard" },
        ]}
      />
      <div className="tracker-container">
        <Grid
          container
          spacing={1}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: width,
          }}
        >
          <Grid item xs={12} sm={12} md={8} lg={6}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="What I Owe" {...a11yProps(0)} />
                  <Tab label="What I'm Owed" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <>
                  {expensesData && (
                    <div className="page-container">
                      <Typography
                        variant="h5"
                        sx={{ paddingBottom: 2, textAlign: "center" }}
                      >
                        I Owe <span style={{ color: "red" }}>${totalOwe}</span>
                      </Typography>
                      {expensesData.whatIOwe.length === 0 ? (
                        <Typography
                          variant="body1"
                          style={{ marginTop: "10px" }}
                          align="center"
                        >
                          You are all settled up!
                        </Typography>
                      ) : (
                        //expensesData.whatIOwe.map((expense, index) => (
                        <Grid container spacing={2}>
                          {expensesData.whatIOwe.map((expense, index) => (
                            <>
                              <Grid item xs={12} md={9}>
                                <Typography variant="body1">
                                  I owe {expense.name}{" "}
                                  <span style={{ color: "red" }}>
                                    ${expense.amount}
                                  </span>{" "}
                                  in group {expense.group} for{" "}
                                  {expense.description}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Button
                                  onClick={() => handleSettleUp(expense)}
                                  variant="contained"
                                  color="primary"
                                  endIcon={<MonetizationOnIcon />}
                                  size="small"
                                >
                                  Settle
                                </Button>
                              </Grid>
                            </>
                          ))}
                        </Grid>
                        // ))
                      )}
                    </div>
                  )}
                </>
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <>
                  {expensesData && (
                    <div className="page-container">
                      <Typography
                        variant="h5"
                        sx={{ paddingBottom: 2, textAlign: "center" }}
                      >
                        I'm Owed{" "}
                        <span style={{ color: "green" }}>${totalOwed}</span>
                      </Typography>
                      {expensesData.whatImOwed.length === 0 ? (
                        <Typography
                          variant="body1"
                          style={{ marginTop: "10px" }}
                          align="center"
                        >
                          You are all settled up!
                        </Typography>
                      ) : (
                        <Grid container spacing={2}>
                          {expensesData.whatImOwed.map((expense, index) => (
                            <div key={index}>
                              <Grid item xs={9}>
                                <Typography variant="body1">
                                  {expense.name} owes me{" "}
                                  <span style={{ color: "green" }}>
                                    ${expense.amount}
                                  </span>{" "}
                                  in group {expense.group} for{" "}
                                  {expense.description}
                                </Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Button
                                  onClick={() => handleSettleUp(expense)}
                                  variant="contained"
                                  color="primary"
                                  endIcon={<MonetizationOnIcon />}
                                  size="small"
                                >
                                  Settle
                                </Button>
                              </Grid>
                            </div>
                          ))}
                        </Grid>
                      )}
                    </div>
                  )}
                </>
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
        {snackbar && (
          <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
        )}
      </div>
    </>
  );
};

export default GroupExpenseDashboard;
