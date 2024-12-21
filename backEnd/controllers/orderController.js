import {
  createOrder,
  updateOrder,
  retrieveAllorders,
} from "../databases/orderDatabase.js";
import {
  retrieveAllProducts,
  updateProduct,
} from "../databases/productDatabase.js";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";

const validAttributes = [
  "o.orderId",
  "o.orderDate",
  "o.patientId",
  "u.firstName",
  "u.lastName",
  "totalAmount",
];

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
  cart.forEach(async (product) => {
    const obj = await retrieveAllProducts(
      [" p.productStackQuantity"],
      [`p.productId = ${product.productId}`],
      null,
      10,
      1
    );
    console.log(obj[0].productstackquantity - product.productQuantity);
    const response = await updateProduct(
      {
        productstackquantity:
          obj[0].productstackquantity - product.productQuantity,
      },
      product.productId
    );
    console.log(response);
  });
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

const getAllorders = catchAsyncError(async (req, res, next) => {
  let fields;
  if (req.query.fields) {
    fields = fieldsQueryHandler(req.query, validAttributes);
    if (!fields) return next(new AppError("Invalid query atrributes", 400));
    if (fields.length == 0) fields = undefined;
    if (fields) {
      fields = fields.join(",").replaceAll("doctor", " d.doctor").split(",");
      fields = fields.join(",").replaceAll("work", " w.work").split(",");
    }
  }
  delete req.query.fields;

  let orders;

  if (req.query.order) {
    orders = orderQueryHandler(req.query, validAttributes);
    if (!orders) return next(new AppError("Invalid query atrributes", 400));
    if (orders.length == 0) orders = undefined;
    if (orders) {
      orders = orders.join(",").replaceAll("doctor", " d.doctor").split(",");
      orders = orders.join(",").replaceAll("work", " w.work").split(",");
    }
  }

  delete req.query.order;

  let limit = req.query.limit || 50;
  let page = req.query.page || 1;

  delete req.query.limit;
  delete req.query.page;

  let filters;
  if (req.query) {
    filters = filterQueryHandler(req.query, validAttributes);
    if (!filters) return next(new AppError("Invalid query atrributes", 400));
    if (filters.length == 0) filters = undefined;
    if (filters) {
      filters = filters.join(",").replaceAll("doctor", " d.doctor").split(",");
      filters = filters.join(",").replaceAll("work", " w.work").split(",");
    }
  }
  const allOrders = await retrieveAllorders(
    fields,
    filters,
    orders,
    limit,
    page
  );
  res.status(200).json({
    status: "success",
    ok: true,
    data: { allOrders },
  });
});
export { placeOrder, editOrder, getAllorders };
