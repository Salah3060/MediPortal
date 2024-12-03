import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";

import { retrieveAllProducts } from "../databases/productDatabase.js";

const validAttributes = [
  "productId",
  "productName",
  "productCategory",
  "manufacture",
  "productPrice",
  "productDescription",
  "categoryName",
];

const getAllProducts = catchAsyncError(async (req, res, next) => {
  let fields;
  if (req.query.fields) {
    fields = fieldsQueryHandler(req.query, validAttributes);
    if (!fields) return next(new AppError("Invalid query atrributes", 400));
    if (fields.length == 0) fields = undefined;
    if (fields)
      fields = fields.join(",").replaceAll("product", " p.product").split(",");
  }
  delete req.query.fields;

  let orders;

  if (req.query.order) {
    orders = orderQueryHandler(req.query, validAttributes);
    if (!orders) return next(new AppError("Invalid query atrributes", 400));
    if (orders.length == 0) orders = undefined;
    if (orders) orders = orders.join(",").replaceAll("p", "p.p").split(",");
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
    if (filters) filters = filters.join(",").replaceAll("p", "p.p").split(",");
  }

  const products = await retrieveAllProducts(
    fields,
    filters,
    orders,
    limit,
    page
  );

  res.status(200).json({
    status: "success",
    ok: true,
    data: { products },
  });
});

export { getAllProducts };
