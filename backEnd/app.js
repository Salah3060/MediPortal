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
import workspaceRouter from "./routes/workspaceRouter.js";
import offerRouter from "./routes/offerRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import questionRouter from "./routes/questionRouter.js";
import providerRouter from "./routes/providerRouter.js";
import insuranceRouter from "./routes/insuranceRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import pkg from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { AppError, globalErrorHandler } from "./utilities.js";
import { makeReview } from "./controllers/reviewController.js";

// const cors = require("cors");
const app = express();
app.use(cookieparser());

app.use(
  cors({
    origin: "*",
    credentials: true,
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
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/patients", patientRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/workspace", workspaceRouter);
app.use("/api/v1/offers", offerRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/providers", providerRouter);
app.use("/api/v1/insurancess", insuranceRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use("/", (req, res, next) =>
  next(new AppError("No such Route Founded....", 404))
);
app.use(globalErrorHandler);

export default app;
