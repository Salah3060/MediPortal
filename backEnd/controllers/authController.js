import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import {
  logInDb,
  registerDb,
  updatePassword,
  updateUserDb,
  updateVerificationCode,
} from "../databases/authDatabase.js";
import { AppError, formatString, catchAsyncError } from "../utilities.js";
const { data, JsonWebToken } = pkg;
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import { promisify } from "util";
import { appendFile, stat } from "fs";
import e from "express";
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
    let { email, password } = req.body;
    if (!email || !password)
      return next(new AppError("Please Provide Email and password", 400));

    const user = await logInDb(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Invalid email or password", 404));
    }
    if (user.userstate != "Active") {
      return next(new AppError("Sorry , this user is blocked", 401));
    }
    delete user.password;
    console.log(user);
    sendAndSignToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

const registerController = catchAsyncError(async (req, res, next) => {
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
    } else {
      return next(
        new AppError("Insert a valid role either Patient or doctor", 400)
      );
    }

    const newUser = await registerDb(attributes, userRole, specificAtt);
    if (newUser.severity === "ERROR" || newUser.status === "fail") {
      console.log(newUser.message);
      let message =
        newUser.code == "23505"
          ? "This email already exists"
          : "something wrong happened!";
      message = newUser.message ? newUser.message : message;
      return next(new AppError(message, 400));
    }
    delete newUser.password;
    sendAndSignToken(newUser, res);
  } catch (err) {
    console.log(err);
  }
});

const validateLoggedIn = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // const { jwt: token } = req.cookies;
  //token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM0NTUyMDYwLCJleHAiOjE3MzQ2Mzg0NjB9.pyfPkywWxuy7a0MpDyMwkhitBUn8n8a8yttAMsvyTEA`;
  if (!token)
    return next(
      new AppError("Protected Path , Plesase login to get access", 401)
    );

  const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  if (!id)
    return next(
      new AppError("Protected Path , Plesase login to get access", 401)
    );
  const user = await logInDb(undefined, id);
  if (!user) new AppError("Protected Path , Plesase login to get access", 401);
  req.user = user;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userrole)) {
      throw new AppError(
        "You don't have the permission to perform this action",
        403
      );
    }
    next();
  };
};

// wrapper if the admin wants to update patient or doctor
const updateUser = (role) => {
  return async (req, res, next) => {
    try {
      const { user } = req;
      let id;
      console.log(role);
      if (user.userrole === "Doctor" || user.userrole === "Patient") {
        id = user.userid;
        if (user.userrole !== role) {
          return next(
            new AppError("roles didn't match, something went wrong", 400)
          );
        }
      } else if (user.userrole === "Admin") {
        if (role === "Me")
          return next(
            new AppError(
              "You must be an patient or a doctor to use updateMe",
              400
            )
          );
        id = req.params.id;
      }

      let {
        firstname,
        lastname,
        phonenumber,
        email,
        gender,
        // wallet,
        birthdate,
        userstate,
        // patient
        bloodtype,
        chronicdisease,
        // doctor
        licensenumber,
        yearsofexperience,
        about,
        specialization,
        fees,
      } = req.body;
      // preparing attributes
      firstname = firstname ? formatString(firstname) : null;
      lastname = lastname ? formatString(lastname) : null;
      gender = gender ? formatString(gender) : null;
      phonenumber = phonenumber ? phonenumber.replaceAll(" ", "") : null; //removing all spaces
      email = email ? email.trim() : null;
      // wallet = wallet ? wallet.trim() : null;
      birthdate = birthdate ? birthdate.trim() : null;
      userstate = userstate ? formatString(userstate) : null;
      // validating attributes (needs to be factorized later)
      if (userstate && user.userrole !== "Admin") {
        return next(
          new AppError("you are not allowed as a user to update the state")
        );
      }
      if (
        (firstname && !validator.isAlpha(firstname)) ||
        (lastname && !validator.isAlpha(lastname))
      ) {
        return next(new AppError("please provide a valide name", 400));
      }

      if (email && !validator.isEmail(email)) {
        return next(new AppError("Please provide a valid email", 400));
      }

      if (
        phonenumber &&
        (!(
          phonenumber.length === 11 ||
          phonenumber.length === 13 ||
          phonenumber.length === 14
        ) ||
          !(
            phonenumber.startsWith("01") ||
            phonenumber.startsWith("+2") ||
            phonenumber.startsWith("002")
          ))
      ) {
        return next(new AppError("Please provide a valid phone number", 400));
      }

      if (birthdate && new Date(birthdate) > Date.now()) {
        return next(new AppError("Please provide a valid birthdate", 400));
      }

      if (gender && !(gender === "Male" || gender === "Female")) {
        return next(new AppError("Please provide a valid gender", 400));
      }
      // sending attributes
      let toBeEdited = {};
      toBeEdited.firstname = firstname;
      toBeEdited.lastname = lastname;
      toBeEdited.phonenumber = phonenumber;
      toBeEdited.email = email;
      toBeEdited.gender = gender;
      // toBeEdited.wallet = wallet;
      toBeEdited.birthdate = birthdate;
      toBeEdited.updatedat = Date.now();
      toBeEdited.userstate = userstate;

      // preparing patient attributes
      bloodtype = bloodtype ? formatString(bloodtype) : null;
      chronicdisease = chronicdisease ? chronicdisease.trim() : null;
      // preparing doctor attributes
      licensenumber = licensenumber ? licensenumber.trim() : null;
      yearsofexperience = yearsofexperience ? yearsofexperience.trim() : null;
      about = about ? about.trim() : null;
      specialization = specialization ? formatString(specialization) : null;

      // validating spacific attributes
      if (licensenumber && !validator.isNumeric(licensenumber)) {
        return next(new AppError("License number must be numbers!", 400));
      }
      if (yearsofexperience && !validator.isNumeric(yearsofexperience)) {
        return next(new AppError("Years of experience must be numbers!", 400));
      }
      if (fees && !validator.isNumeric(fees)) {
        return next(new AppError("Fees must be numbers!", 400));
      }
      let specificAtt = {};
      if (role === "Patient") {
        specificAtt.bloodtype = bloodtype;
        specificAtt.chronicdisease = chronicdisease;
      } else if (role === "Doctor") {
        specificAtt.licensenumber = licensenumber;
        specificAtt.yearsofexperience = yearsofexperience;
        specificAtt.about = about;
        specificAtt.specialization = specialization;
        specificAtt.fees = fees;
      } else {
        return next(new AppError("something wrong happened!", 400));
      }
      const updatedUser = await updateUserDb(toBeEdited, specificAtt, role, id);
      if (updatedUser.severity === "ERROR" || updatedUser.status === "fail") {
        let message = updatedUser.message
          ? updatedUser.message
          : "something wrong happened!";
        return next(new AppError(message, 400));
      }
      delete updatedUser.password;
      res.status(200).json({
        status: "successful",
        data: {
          updatedUser,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
// const updateUser = catchAsyncError(async (req, res, next) => {

// });

const sendEmailVerificationCode = catchAsyncError(async (req, res, next) => {
  const { email } = req.params;
  if (!email) return next(new AppError("Please Provide your email ", 401));
  const user = await logInDb(email);

  if (!user) return next(new AppError("Invalid Email...", 404));

  const verificationCode = Math.floor(Math.random() * 100000000);

  await updateVerificationCode(email, verificationCode);

  // nodemailer calling here

  ///
  res.status(200).json({
    staus: "success",
    ok: true,
    message: `verificationCode has been sent to ${email} properly`,
  });
});

const resstPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.params;
  const { password, verificationCode: verCode } = req.body;

  if (!email) return next(new AppError("Please Provide your email ", 401));

  if (!password || !verCode)
    return next(
      new AppError("Please provide new password and veriffcation code", 404)
    );
  let user = await logInDb(email);

  if (!user) return next(new AppError("Invalid Email...", 404));

  if (user.verificationcode != verCode)
    return next(new AppError("Invalid verification code...", 404));

  const encPassword = await bcrypt.hash(password, 10);

  user = await updatePassword(email, undefined, encPassword);

  if (!user) return next(new AppError("Failed to update password", 404));

  res.status(200).json({
    status: "success",
    ok: true,
    message: "Password updated succesfully..",
  });
});

export {
  logInController,
  registerController,
  validateLoggedIn,
  restrictTo,
  updateUser,
  sendEmailVerificationCode,
  resstPassword,
};
