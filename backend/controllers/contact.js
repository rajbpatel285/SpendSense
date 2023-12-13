const contact = require("../models/contacts");
const mongoose = require("mongoose");
const User = require("../models/user-model");

const addContactUsRecord = async (req, res) => {
  try {
    let contactUsDetails = req.body;
    await contact.insertMany(contactUsDetails);
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

module.exports = {
  addContactUsRecord,
};
