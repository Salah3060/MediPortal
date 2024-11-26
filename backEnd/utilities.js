import { query } from "express";
import pkg from "postcss/lib/css-syntax-error";
const { captureStackTrace } = pkg;

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4)
      ? "fail"
      : "internal database error";
    this.isOperational = true;

    captureStackTrace(this, this.constructor);
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
    if (el[0] === "userId") return `${el[0]} = ${Number(el[1])}`;
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
export {
  AppError,
  globalErrorHandler,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
};