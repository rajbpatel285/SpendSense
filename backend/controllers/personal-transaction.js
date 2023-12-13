const Transaction = require("../models/transaction");
const uuid = require("uuid");

const addPersonalTransaction = async (req, res) => {
  const { date, amount, category, note, typeOfTransaction, userId } = req.body;
  const transactionId = uuid.v4();
  const newTransaction = new Transaction({
    date: date,
    amount: amount,
    category: category,
    note: note,
    typeOfTransaction: typeOfTransaction,
    transactionId: transactionId,
    userId: userId,
  });

  newTransaction
    .save()
    .then((savedTransaction) => {
      res.status(200).send(savedTransaction);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getPersonalTransaction = async (req, res) => {
  const transactionId = req.params.transactionId;
  Transaction.findOne({ transactionId: transactionId })
    .then((transaction) => {
      if (!transaction) {
        res.status(404).json({
          message: "Transaction not found",
          success: false,
        });
      } else {
        res.status(200).json({
          message: "Transaction successfully retrived",
          success: true,
          transaction: transaction,
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getPersonalTransactions = async (req, res) => {
  const userId = req.body.userId;

  Transaction.find({ userId: userId })
    .exec()
    .then((transactions) => {
      if (!transactions || !transactions.length) {
        return res
          .status(404)
          .json({ success: false, data: "No Transactions found!" });
      }
      return res.status(200).json({
        message: "Transactions retrived",
        success: true,
        transactions: transactions,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const updatePersonalTransaction = async (req, res) => {
  const transactionId = req.params.transactionId;
  const { date, amount, category, note, typeOfTransaction, userId } = req.body;

  Transaction.findOneAndUpdate(
    { transactionId: transactionId },
    { date, amount, category, note, typeOfTransaction, transactionId, userId },
    { new: true }
  )
    .then((updatedTransaction) => {
      if (!updatedTransaction) {
        res.status(404).json({
          message: "Transaction not found",
          success: false,
        });
      } else if (
        !date ||
        !amount ||
        !category ||
        !note ||
        !typeOfTransaction ||
        !transactionId ||
        !userId
      ) {
        res.status(400).json({
          message: "Missing required Transaction data fields",
          success: false,
        });
      } else {
        res.status(200).json({
          message: "Transaction updated successfully",
          success: true,
          transaction: updatedTransaction,
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const deletePersonalTransaction = async (req, res) => {
  const transactionId = req.params.transactionId;

  Transaction.findOneAndDelete({ transactionId: transactionId })
    .then((deletedTransaction) => {
      if (!deletedTransaction) {
        res.status(404).json({
          message: "Transaction not found",
          success: false,
        });
      } else {
        res.status(200).json({
          message: "Transaction deleted successfully",
          success: true,
          transaction: deletedTransaction,
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addPersonalTransaction,
  getPersonalTransaction,
  getPersonalTransactions,
  updatePersonalTransaction,
  deletePersonalTransaction,
};
