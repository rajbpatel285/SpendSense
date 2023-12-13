import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/AddTransaction.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import ExpensePage from "./ExpensePage";
import IncomePage from "./IncomePage";
import { CustomBreadcrumbs } from "../../utils/Breadcrums";

const AddTransaction = ({ selectedDate, width = "100%" }) => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

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

  const handleExpenseSubmit = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleIncomeSubmit = (income) => {
    setIncomes([...incomes, income]);
  };

  return (
    <>
      <CustomBreadcrumbs
        pages={[
          { text: "Home", link: "/homepage" },
          { text: "Personal - Home", link: "/personalExpenseHomepage" },
          { text: "Add Expense", link: "/addTransaction" },
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
                  <Tab label="Add Expense" {...a11yProps(0)} />
                  <Tab label="Add Income" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <ExpensePage
                  selectedDate={selectedDate}
                  handleExpenseSubmit={handleExpenseSubmit}
                />
              </CustomTabPanel>

              <CustomTabPanel value={value} index={1}>
                <IncomePage
                  selectedDate={selectedDate}
                  handleIncomeSubmit={handleIncomeSubmit}
                />
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddTransaction;
