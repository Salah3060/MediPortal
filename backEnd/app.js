// const express = require("express");
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
dotenv.config({ path: "../BE.env" });
import authRouter from "./routes/authRouter.js";
import doctorRouter from "./routes/doctorRouter.js";

import { AppError, globalErrorHandler } from "./utilities.js";

// const cors = require("cors");
const app = express();
app.use(cookieparser());

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);
app.use("/doctors", doctorRouter);
app.use("/", (req, res, next) =>
  next(new AppError("No such Route Founded....", 404))
);
app.use(globalErrorHandler);

export default app;
