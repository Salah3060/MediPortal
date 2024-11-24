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

export { AppError, globalErrorHandler };
