const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupTransactions = new Schema({
  transactionId: {
    type: String,
    required: true,
    trim: true,
  },
  groupId: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  paidByUserId: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  settledUp: {
    type: Boolean,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("groupTransactions", groupTransactions);
