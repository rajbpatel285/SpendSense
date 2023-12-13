const express = require("express");
const cors = require("cors");
const { mongoose } = require("./db");
const router = require("./routes/routes");

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Node API app is running on port ${PORT}`);
});
