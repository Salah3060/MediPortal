import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import { signUpDb } from "../databases/authDatabase.js";
import { AppError } from "../utilities.js";
const { data, JsonWebToken } = pkg;
import jwt from "jsonwebtoken";

dotenv.config("../../BE.env");

const signUpController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("Invalid email or password", 400));

    console.log(email, password);
    const user = await signUpDb(email, password);
    if (!user) {
      return next(new AppError("No User valid for this data", 404));
    }
    const { userId } = user;
    const JWT = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie("JWT", jwt, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    delete user.password;
    res.status(200).json({
      status: "success",
      date: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

export { signUpController };
