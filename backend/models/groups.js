const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groups = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "users",
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("groups", groups);
