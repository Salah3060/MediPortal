import { createOrder, updateOrder } from "../databases/orderDatabase.js";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";

const placeOrder = catchAsyncError(async (req, res, next) => {
  const { cart, totalAmount } = req.body;
  const { user } = req;
  if (!cart || !totalAmount) return next(new AppError("Missing data", 400));
  console.log(cart);
  let attribute = [Date.now(), totalAmount, "Successful"];
  const order = await createOrder(attribute, cart, user.userid);
  if (order.status === "fail" || order.severity === "ERROR") {
    return next(new AppError(order.message || "something went wrong"));
  }
  res.status(200).json({
    status: "successful",
    data: { order },
  });
});

const editOrder = catchAsyncError(async (req, res, next) => {
  const { orderStatus } = req.body;
  const orderId = req.params.id;
  if (!orderStatus)
    return next(new AppError("you can only update order status", 400));
  const order = await updateOrder(orderStatus, orderId);
  if (order.status === "fail" || order.severity === "ERROR") {
    return next(new AppError(order.message || "something went wrong"));
  }
  res.status(200).json({
    status: "successful",
    data: {
      order,
    },
  });
});
export { placeOrder, editOrder };
