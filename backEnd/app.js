// const express = require("express");
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: "../BE.env" });

// const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "sucess",
    message: "hello from server",
  });
});

export default app;
