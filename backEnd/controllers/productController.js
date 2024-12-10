import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";

import {
  retrieveAllProducts,
  createProduct,
} from "../databases/productDatabase.js";
import validator from "validator";

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

const addProduct = catchAsyncError(async (req, res, next) => {
  let {
    productName,
    productPrice,
    productStackQuantity,
    productDescription,
    productExpiryDate,
    productCategory,
    manufacture,
  } = req.body;
  if (
    !productName ||
    !productPrice ||
    !productStackQuantity ||
    !productDescription ||
    !productExpiryDate ||
    !productCategory ||
    !manufacture
  ) {
    return next(new AppError("Missing data", 400));
  }
  productName = formatString(productName);
  productCategory = formatString(productCategory);
  productPrice = productPrice.trim();
  productDescription = productDescription.trim();
  productExpiryDate = productExpiryDate.trim();
  manufacture = formatString(manufacture);

  if (!validator.isNumeric(productPrice)) {
    return next(new AppError("Price must be a number", 400));
  }
  if (!validator.isNumeric(productStackQuantity)) {
    return next(new AppError("Quantity must be an integer", 400));
  }
  let attributes = [
    productName,
    productPrice,
    productStackQuantity,
    productDescription,
    productExpiryDate,
    productCategory,
    manufacture,
  ];
  const product = await createProduct(attributes);
  if (product.severity === "ERROR") {
    return next(
      new AppError("something went wrong with adding a new product", 400)
    );
  }
  res.status(200).json({
    status: "successful",
    data: { product },
  });
});
export { getAllProducts, addProduct };
