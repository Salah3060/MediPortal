// const express = require("express");
// const dotenv = require("dotenv");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
dotenv.config({ path: "../BE.env" });
import authRouter from "./routes/authRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import patientRouter from "./routes/patientRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import pkg from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { AppError, globalErrorHandler } from "./utilities.js";

// const cors = require("cors");
const app = express();
app.use(cookieparser());

app.use(
  cors({
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());

// app.use("/test", (req, res, next) => {
//   res.cookie("JWT", "hi", {
//     httpOnly: true, // Prevents JavaScript access to cookies
//     // secure: false, // Disable secure in development (localhost)
//     // maxAge: 3600000, // 1-hour expiration
//   });
//   res.end("hello");
// });
app.use("/auth", authRouter);
app.use("/doctors", doctorRouter);
app.use("/patients", patientRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/", (req, res, next) =>
  next(new AppError("No such Route Founded....", 404))
);
app.use(globalErrorHandler);

export default app;
