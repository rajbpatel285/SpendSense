import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  styled,
  Grid,
  Container,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarView from "../CalenderView";
import { CustomBreadcrumbs } from "../../utils/Breadcrums";

const StyledTableContainer = styled(TableContainer)({
  width: "80%",
  maxWidth: 800,
  margin: "0 auto",
  marginTop: (theme) => theme.spacing(2),
});

const StyledTableCellHeader = styled(TableCell)({
  fontWeight: "bold",
});

const StyledIncomeRow = styled(TableRow)({
  backgroundColor: "#c9ffd7",
});

const StyledExpenseRow = styled(TableRow)({
  backgroundColor: "#ffb0b0",
});

const PersonalTransaction = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState("");
  const [view, setView] = useState("list");

  const userId = sessionStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post("/personalTransactions", { userId })
      .then((response) => {
        setTotal(
          response.data.transactions.reduce(
            (total, transaction) =>
              transaction.typeOfTransaction === "Income"
                ? total + transaction.amount
                : total - transaction.amount,
            0
          )
        );
        setData(
          response.data.transactions.sort((a, b) => (a.date > b.date ? 1 : -1))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (transactionId) => {
    axios
      .delete(`/personalTransaction/delete/${transactionId}`)
      .then((response) => {
        console.log("Transaction deleted:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <CustomBreadcrumbs
        pages={[
          { text: "Home", link: "/homepage" },
          { text: "Personal - Home", link: "/personalExpenseHomepage" },
          { text: "Transactions", link: "/personal" },
        ]}
      />
      <div>
        <h1 style={{ textAlign: "center" }}>Transactions</h1>
        <Container
          maxWidth="md"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2%",
          }}
        ></Container>
        {view === "list" ? (
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCellHeader>Date</StyledTableCellHeader>
                  <StyledTableCellHeader>Amount</StyledTableCellHeader>
                  <StyledTableCellHeader>Category</StyledTableCellHeader>
                  <StyledTableCellHeader>Note</StyledTableCellHeader>
                  <StyledTableCellHeader>Actions</StyledTableCellHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow
                    key={item._id}
                    className={`transaction-${item.typeOfTransaction.toLowerCase()} ${
                      item.typeOfTransaction === "Income"
                        ? "incomeRow"
                        : "expenseRow"
                    }`}
                    component={
                      item.typeOfTransaction === "Income"
                        ? StyledIncomeRow
                        : StyledExpenseRow
                    }
                  >
                    <TableCell>
                      {new Date(item.date).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell>{"$" + item.amount}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          const route =
                            item.typeOfTransaction === "Expense"
                              ? "/update/expense"
                              : "/update/income";
                          navigate(route, {
                            state: {
                              transactionId: item.transactionId,
                            },
                          });
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(item.transactionId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Balance</TableCell>
                  <TableCell
                    style={{
                      color: total >= 0 ? "green" : "red",
                    }}
                  >
                    {total > 0 ? "$" + total : "- $" + -1 * total}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </StyledTableContainer>
        ) : (
          <CalendarView style={{ height: "500px" }} />
        )}
      </div>
    </>
  );
};

export default PersonalTransaction;
