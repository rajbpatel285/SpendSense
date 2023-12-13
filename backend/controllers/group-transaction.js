const groupTransaction = require("../models/groupTransactions");
const group = require("../models/groups");
const uuid = require("uuid");
const mongoose = require("mongoose");
const User = require("../models/user-model");
const Transaction = require("../models/transaction");

const addGroupTransaction = async (req, res) => {
  const transactionId = uuid.v4();
  try {
    let transactionData = req.body;
    const transactions = transactionData.splitAmounts.map((splitAmount) => {
      return {
        transactionId,
        groupId: transactionData.group,
        description: transactionData.note,
        paidByUserId: transactionData.paidByUserId,
        userId: splitAmount.memberId,
        amount: splitAmount.amount,
        settledUp: false,
        timestamp: transactionData.date,
      };
    });
    transactions.forEach(async (transaction) => {
      transaction.transactionId = transactionId;
      await groupTransaction.insertMany(transaction);
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const userAmountData = async (req, res) => {
  const currentUserId = req.params.userId;
  try {
    let result = { whatIOwe: [], whatImOwed: [] };
    const owedData = await groupTransaction.find({
      $and: [
        { paidByUserId: currentUserId },
        { userId: { $ne: currentUserId } },
        { settledUp: false },
      ],
    });
    const oweData = await groupTransaction.find({
      $and: [
        { userId: currentUserId },
        { paidByUserId: { $ne: currentUserId } },
        { settledUp: false },
      ],
    });

    for (const transaction of owedData) {
      let amount = transaction.amount;
      let groupDetails = await group.find({
        _id: new mongoose.Types.ObjectId(transaction.groupId),
      });
      let user = await User.find({
        _id: new mongoose.Types.ObjectId(transaction.userId),
      });
      let groupName = groupDetails[0].name;
      let name = user[0].firstname + " " + user[0].lastname;
      result.whatImOwed.push({
        id: transaction._id,
        name,
        amount,
        group: groupName,
        description: transaction.description,
      });
    }

    for (const transaction of oweData) {
      let amount = transaction.amount;
      let groupDetails = await group.find({
        _id: new mongoose.Types.ObjectId(transaction.groupId),
      });
      let user = await User.find({
        _id: new mongoose.Types.ObjectId(transaction.paidByUserId),
      });
      let groupName = groupDetails[0].name;
      let name = user[0].firstname + " " + user[0].lastname;
      result.whatIOwe.push({
        id: transaction._id,
        name,
        amount,
        group: groupName,
        description: transaction.description,
      });
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const addGroup = async (req, res) => {
  try {
    let members = req.body.members;
    let name = req.body.name;
    let newGroup = { members, name };
    console.log(newGroup);
    await group.insertMany(newGroup);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const getGroupTransactions = async (req, res) => {
  try {
    let groupId = req.params.id;
    const groupTransactions = await groupTransaction.aggregate([
      {
        $match: {
          groupId: groupId,
        },
      },
      {
        $addFields: {
          paidByUserIdObjectId: { $toObjectId: "$paidByUserId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "paidByUserIdObjectId",
          foreignField: "_id",
          as: "paidByUserData",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$transactionId",
          groupId: 1,
          timestamp: 1,
          description: 1,
          paidBy: { $arrayElemAt: ["$paidByUserData.firstname", 0] },
          memberDivision: "$amount",
        },
      },
      {
        $group: {
          _id: "$id",
          groupId: { $first: "$groupId" },
          timestamp: { $first: "$timestamp" },
          description: { $first: "$description" },
          paidBy: { $first: "$paidBy" },
          memberDivision: { $push: "$memberDivision" },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          groupId: 1,
          timestamp: 1,
          description: 1,
          paidBy: 1,
          memberDivision: 1,
        },
      },
    ]);

    res.status(200).json(groupTransactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const settleUp = async (req, res) => {
  try {
    let transactionOId = req.body.id;
    const updateResult = await groupTransaction.updateOne(
      {
        _id: new mongoose.Types.ObjectId(transactionOId),
      },
      {
        $set: {
          settledUp: true,
        },
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const expenseReportData = async (req, res) => {
  try {
    let userId = req.body.id;
    let month = req.body.month;
    const expenseReportData = await Transaction.find(
      {
        userId: userId,
      },
      "typeOfTransaction date amount category"
    );
    const updatedExpenseReportData = expenseReportData.map((data) => ({
      typeOfTransaction: data.typeOfTransaction,
      category: data.category,
      amount: data.amount,
      date: formatDate(data.date),
    }));

    const finalUpdatedExpenseReportData = [];
    for (let i = 0; i < updatedExpenseReportData.length; i++) {
      const data = updatedExpenseReportData[i];
      if (
        Number(data.date.split("-")[1]) == Number(month) &&
        data.typeOfTransaction !== "Income"
      ) {
        finalUpdatedExpenseReportData.push(data);
      }
    }
    res.status(200).json(finalUpdatedExpenseReportData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      failure: true,
    });
  }
};

const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

module.exports = {
  addGroupTransaction,
  userAmountData,
  addGroup,
  getGroupTransactions,
  settleUp,
  expenseReportData,
};
