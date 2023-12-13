import { React, useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  Box,
  Container,
} from "@mui/material";
import { Line, Bar, Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import predictTotalExpense from "../../utils/ExpensePredictor";
import axios from "axios";
import { CustomBreadcrumbs } from "../../utils/Breadcrums";
const ExpenseGraph = () => {
  const months = [
    { id: "1", name: "January" },
    { id: "2", name: "February" },
    { id: "3", name: "March" },
    { id: "4", name: "April" },
    { id: "5", name: "May" },
    { id: "6", name: "June" },
    { id: "7", name: "July" },
    { id: "8", name: "August" },
    { id: "9", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];

  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState();
  const [chartType, setChartType] = useState("line");
  const [projectedExpense, setProjectedExpense] = useState(0);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [expenseData, setExpenseData] = useState({});

  const getMonthlyExpenseData = (month) => {
    console.log(window.sessionStorage.getItem("userId"));
    console.log(selectedMonth);
    axios
      .post("/expenseReportData", {
        id: window.sessionStorage.getItem("userId"),
        month,
      })
      .then((res) => {
        if (res.data.length) {
          const data = res.data;
          setMonthlyExpenses(data);
          setExpenseData({
            labels: data.map((entry) => entry.date),
            datasets: [
              {
                label: "Expenses",
                data: data.map((entry) => entry.amount),
                fill: true,
                backgroundColor: "rgba(204, 230, 255, 0.5)",
                borderColor: "rgba(23,117,209,1)",
              },
            ],
          });
          setIsDataAvailable(true);
        } else {
          setIsDataAvailable(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsDataAvailable(false);
      });
  };

  const handleMonthChange = (event) => {
    console.log(event.target.value);
    setSelectedMonth(event.target.value);
    getMonthlyExpenseData(event.target.value);
  };

  const handleChartTypeToggle = () => {
    const newChartType = chartType === "line" ? "bar" : "line";
    setChartType(newChartType);
  };

  const calculateProjectedExpense = () => {
    const projectedExpense = predictTotalExpense(
      monthlyExpenses.map(({ date, amount }, index) => ({
        day: index,
        expense: amount,
      }))
    );
    setProjectedExpense(projectedExpense);
  };

  const chartRef = useRef();

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        type: "linear",
      },
    },
  };

  useEffect(() => {
    if (Chart.registerables) {
      Chart.register(...Chart.registerables);
    }
    calculateProjectedExpense();
  }, [expenseData, selectedMonth]);

  useEffect(() => {
    calculateProjectedExpense();
  }, [expenseData, selectedMonth]);

  const chartComponent =
    chartType === "line" ? (
      <Line ref={chartRef} data={expenseData} options={options} />
    ) : (
      //   <Bar ref={chartRef} data={expenseData} options={options} />
      <Radar data={expenseData} />
    );

  return (
    <>
      <CustomBreadcrumbs
        pages={[
          { text: "Home", link: "/homepage" },
          { text: "Report - Home", link: "/analyticsHomepage" },
          { text: "Trends", link: "/trends" },
        ]}
      />
      <Box style={{ padding: "3%" }}>
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="h6">Expense Trend</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="month-label">Select Month</InputLabel>
                <Select
                  labelId="month-label"
                  label="Select Month"
                  id="month-select"
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month, index) => (
                    <MenuItem value={month.id}>{month.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {isDataAvailable && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                container
                alignItems="center"
              >
                <Typography component="div" variant="body2">
                  Line Chart
                </Typography>
                <Switch
                  checked={chartType === "bar"}
                  onChange={handleChartTypeToggle}
                />
                <Typography component="div" variant="body2">
                  Radar Chart
                </Typography>
              </Grid>
            )}
            {isDataAvailable && chartComponent}
            {isDataAvailable && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    paddingTop: "3%",
                  }}
                >
                  Projected Expense
                </Typography>
                <Typography
                  style={{
                    paddingTop: "2%",
                  }}
                >
                  Based on your daily expenditure, the predicted expense for
                  this month would be around
                  <strong> ${projectedExpense.toFixed(2)}</strong>
                </Typography>
              </Grid>
            )}
            {!isDataAvailable && (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "200",
                      padding: "3%",
                      textAlign: "center",
                    }}
                  >
                    No data available
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ExpenseGraph;
