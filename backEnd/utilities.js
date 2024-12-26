import { query } from "express";
import pkg from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const storage = multer.diskStorage({});
const upload = multer({ storage, fileFilter: multerFilter });

// Expect the field name to be 'image' (change this if needed)
const uploadPhoto = upload.single("image"); // Match this with your frontend field name

const uploadToCloud = async (req, res, next) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) return next();
    //new AppError("Please Provide the file", 400)
    const result = await cloudinary.uploader.upload(filePath);
    const url = cloudinary.url(result.public_id, {
      transformation: [
        {
          responsive: true, // Keep responsive behavior
          width: "auto:breakpoints", // Dynamically adjusts width for better responsiveness
          height: 200, // Fixed height or remove for proportional scaling
          dpr: "auto", // Adjusts resolution for high-DPI displays (Retina)
          gravity: "faces:auto", // Prioritizes faces, falls back to auto-cropping
          crop: "fill", // Maintains aspect ratio and fills dimensions
          quality: "auto:best", // Ensures highest visual quality
          fetch_format: "auto", // Converts to best format (e.g., WebP/AVIF)
        },
      ],
    });
    // console.log(result);
    // return url;
    //propagation of parameters
    if (url) req.imgurl = url;
    else req.imgurl = null;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteFromCloud = async (url) => {
  try {
    //https://res.cloudinary.com/dgljetjdr/image/upload/c_fill,f_auto,g_faces,h_200,q_auto,w_200/znia0eeexizaoq8f76un?_a=BAMCkGFD0
    const publicId = url.split("/").at(-1).split("?")[0];
    console.log(publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
    console.log(result.result);
    if (result === "ok") {
      console.log("DELETED SUCCESSFULLY");
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    throw err;
  }
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4)
      ? "fail"
      : "internal database error";
    this.isOperational = true;
  }
}

const globalErrorHandler = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err,
  });
};

const catchAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const filterQueryHandler = (query, validAttributes) => {
  if (Object.entries(query).some((el) => !validAttributes.includes(el[0])))
    return false;

  const filters = Object.entries(query).map((el) => {
    if (el[0].slice(-2) === "Id") return `${el[0]} = ${Number(el[1])}`;
    if (el[0].slice(-4) === "Name" || el[0].slice(-4) === "Name") {
      const s = el[1].replaceAll(" ", "");
      console.log(s);
      return `${el[0]} ='${s[0].toUpperCase() + s.slice(1).toLowerCase()}'`;
    }
    return `${el[0]}='${el[1]}'`;
  });
  return filters;
};

const fieldsQueryHandler = (query, validAttributes) => {
  const fields = query.fields.split(",");
  if (fields.some((el) => !validAttributes.includes(el))) return false;
  return fields;
};

const orderQueryHandler = (query, validAttributes) => {
  const orderList = query.order.split(",");

  if (
    orderList.some((el) => {
      if (el.startsWith("-")) return !validAttributes.includes(el.slice(1));
      return !validAttributes.includes(el);
    })
  )
    return false;

  let orders = query.order.split(",");
  orders = orders.map((el) => {
    if (el.startsWith("-")) return `${el.slice(1)} DESC`;
    return `${el} ASC`;
  });
  return orders;
};

const formatString = (string) => {
  string = string.trim();
  string = string[0].toUpperCase() + string.slice(1).toLowerCase();
  return string;
};

export {
  AppError,
  globalErrorHandler,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
  uploadPhoto,
  uploadToCloud,
  deleteFromCloud,
};
