import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import { logInDb, registerDb } from "../databases/authDatabase.js";
import { AppError, formatString, catchAsyncError } from "../utilities.js";
const { data, JsonWebToken } = pkg;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import { promisify } from "util";
dotenv.config("../../BE.env");

const createToken = (id) => {
  const JWT = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return JWT;
};
const sendAndSignToken = async (user, res) => {
  const token = createToken(user.userid);
  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false,
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    token,
    date: { user },
  });
};

const logInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("Invalid email or password", 400));

    const user = await logInDb(email, password);
    if (!user) {
      return next(new AppError("No User valid for this data", 404));
    }

    delete user.password;
    sendAndSignToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

const registerController = async (req, res, next) => {
  try {
    let {
      firstName,
      lastName,
      phoneNumber,
      email,
      gender,
      birthDate,
      password,
      userRole,
      bloodType,
      chronicDisease,
      licenseNumber,
      specialization,
    } = req.body;
    // checking if values actually was sent
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email ||
      !gender ||
      !birthDate ||
      !password ||
      !userRole ||
      !(bloodType || (licenseNumber && specialization)) //either patient or doctor
    ) {
      return next(new AppError("Missing data", 400));
    }
    // preparing attributes
    firstName = formatString(firstName);
    lastName = formatString(lastName);
    gender = formatString(gender);
    userRole = formatString(userRole);
    phoneNumber = phoneNumber.replaceAll(" ", ""); //removing all spaces
    email = email.trim();

    // validating attributes
    if (!validator.isAlpha(firstName) || !validator.isAlpha(lastName)) {
      return next(new AppError("please provide a valide name", 400));
    }

    if (!validator.isEmail(email)) {
      return next(new AppError("Please provide a valid email", 400));
    }

    if (
      !(
        phoneNumber.length === 11 ||
        phoneNumber.length === 13 ||
        phoneNumber.length === 14
      ) ||
      !(
        phoneNumber.startsWith("01") ||
        phoneNumber.startsWith("+2") ||
        phoneNumber.startsWith("002")
      )
    ) {
      return next(new AppError("Please provide a valid phone number", 400));
    }

    if (new Date(birthDate) > Date.now()) {
      return next(new AppError("Please provide a valid birthDate", 400));
    }

    if (!(gender === "Male" || gender === "Female")) {
      return next(new AppError("Please provide a valid gender", 400));
    }

    if (password.length < 8 || !validator.isAlphanumeric(password)) {
      return next(new AppError("Please provide a valid password", 400));
    }
    //password encryption
    const encryptedPass = await bcrypt.hash(password, 10);
    const attributes = [
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      Date.now(),
      "Active",
      birthDate,
      encryptedPass,
    ];
    let specificAtt = [];
    if (userRole === "Patient") {
      specificAtt = [bloodType, chronicDisease];
    } else if (userRole === "Doctor") {
      specificAtt = [licenseNumber, specialization];
    }

    const newUser = await registerDb(attributes, userRole, specificAtt);
    delete newUser.password;
    sendAndSignToken(newUser, res);
  } catch (err) {
    console.log(err);
  }
};

const validateLoggedIn = catchAsyncError(async (req, res, next) => {
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // const { jwt: token } = req.cookies;
  if (!token)
    return next(
      new AppError("Protected Path , Plesase login to get access", 401)
    );

  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  if (!id)
    return next(
      new AppError("Protected Path , Plesase login to get access", 401)
    );
  const user = await logInDb(undefined, undefined, id);
  if (!user) new AppError("Protected Path , Plesase login to get access", 401);
  console.log(user);
  req.user = user;
  next();
});

export { logInController, registerController, validateLoggedIn };
