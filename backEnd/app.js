const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "../BE.env" });

const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "sucess",
    message: "hello from server",
  });
});
module.exports = app;
