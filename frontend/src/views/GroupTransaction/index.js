import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/AddTransaction.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid, Container, Typography, Button } from "@mui/material";
import GroupExpensePage from "./GroupExpensePage";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { CustomBreadcrumbs } from "../../utils/Breadcrums";

const GroupTransaction = ({ width = "100%" }) => {
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

  const [expenseSubmitted, setExpenseSubmitted] = useState(false);
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

  const handleGroupExpenseSubmit = () => {
    console.log("expense has been submitted successfully!");
    setExpenseSubmitted(true);
  };

  const handleAddAnotherExpense = () => {
    window.location.reload(true);
  };

  return (
    <>
      <CustomBreadcrumbs
        pages={[
          { text: "Home", link: "/homepage" },
          { text: "Group - Home", link: "/groupexpensehomepage" },
          { text: "Group Expense", link: "/groupTransaction" },
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
                  <Tab label="Add Group Expense" {...a11yProps(2)} />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                {!expenseSubmitted && (
                  <GroupExpensePage
                    handleGroupExpenseSubmit={handleGroupExpenseSubmit}
                  />
                )}
                {expenseSubmitted && (
                  <>
                    <Grid
                      container
                      spacing={2}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "20px",
                      }}
                    >
                      <Grid item xs={12} style={{ textAlign: "center" }}>
                        <CheckCircleOutlineIcon
                          color="success"
                          fontSize="large"
                        />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                          Expense submitted successfully!
                        </Typography>
                      </Grid>
                      <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Button
                          color="primary"
                          startIcon={<AddIcon />}
                          sx={{ ml: 2 }}
                          onClick={handleAddAnotherExpense}
                        >
                          Add Another Expense
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default GroupTransaction;
