import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";

const makeOrder = catchAsyncError(async (req, res, next) => {
  const { user } = req;
  if (!user || user.userrole != "Patient")
    return next(
      new AppError("Protected Route , Please logIn to get access", 401)
    );
  const { order } = req.body;
  if (!order) return next(new AppError("Please provide order Attributes"));
});

export { makeOrder };
