import { useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { CustomBreadcrumbs } from "../../utils/Breadcrums";

const ExpenseReportPage = () => {
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
  const [chosenMonth, setChosenMonth] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  const handleMonthChange = (event) => {
    setChosenMonth(event.target.value);
    getMonthlyExpenseData(event.target.value);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      html: "#expense-table",
    });
    doc.save("expense-report.pdf");
  };

  const getMonthlyExpenseData = (month) => {
    console.log(window.sessionStorage.getItem("userId"));
    console.log(chosenMonth);
    axios
      .post("/expenseReportData", {
        id: window.sessionStorage.getItem("userId"),
        month,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.length) {
          setExpenses(res.data);
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

  const generateExpenseReport = () => {
    return expenses.map((expense, index) => (
      <TableRow
        key={index}
        sx={{
          backgroundColor: index % 2 === 0 ? "#f5f5f5" : "inherit",
          overflowWrap: "anywhere",
        }}
      >
        <TableCell>{index}</TableCell>
        <TableCell>{expense.date}</TableCell>
        <TableCell>{expense.amount}</TableCell>
        <TableCell>{expense.category}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <CustomBreadcrumbs
        pages={[
          { text: "Home", link: "/homepage" },
          { text: "Report - Home", link: "/analyticsHomepage" },
          { text: "Expense Report", link: "/reports" },
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
              <Typography variant="h6">Expense Report</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControl fullWidth>
                <InputLabel id="month-label">Select Month</InputLabel>
                <Select
                  labelId="month-label"
                  label="Select Month"
                  id="month-select"
                  value={chosenMonth}
                  onChange={handleMonthChange}
                >
                  {months.map((month, index) => (
                    <MenuItem key={index} value={month.id}>
                      {month.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {chosenMonth && isDataAvailable && (
                <div>
                  <>
                    <Table
                      id="expense-table"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: 700 }}>
                            Expense Number
                          </TableCell>
                          <TableCell style={{ fontWeight: 700 }}>
                            Date
                          </TableCell>
                          <TableCell style={{ fontWeight: 700 }}>
                            Amount
                          </TableCell>
                          <TableCell style={{ fontWeight: 700 }}>
                            Category
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{generateExpenseReport()}</TableBody>
                    </Table>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExportPDF}
                      >
                        Export as PDF
                      </Button>
                    </div>
                  </>
                </div>
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
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ExpenseReportPage;
