import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import { logInDb } from "../databases/authDatabase.js";
import { AppError } from "../utilities.js";
const { data, JsonWebToken } = pkg;
import jwt from "jsonwebtoken";

dotenv.config("../../BE.env");

const logInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("Invalid email or password", 400));

    const user = await logInDb(email, password);
    if (!user) {
      return next(new AppError("No User valid for this data", 404));
    }
    const { userId } = user;
    const JWT = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("jwt", JWT, {
      httpOnly: true, // Prevents JavaScript access to cookies
      // secure: false, // Disable secure in development (localhost)
      // maxAge: 3600000, // 1-hour expiration
    });
    delete user.password;
    res.status(200).json({
      status: "success",
      date: { user },
      JWT,
    });
  } catch (error) {
    console.log(error);
  }
};

export { logInController };
