const mongoose = require("mongoose");
const config = require("./config");

mongoose
  .connect(config.mongoDBConnectionString)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mongoose;
