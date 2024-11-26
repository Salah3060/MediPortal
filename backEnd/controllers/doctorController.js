import { retrieveAllDoctors } from "../databases/doctorDatabse.js";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";

const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const validAttributes = [
    "userId",
    "email",
    "phoneNumber",
    "lastName",
    "firstName",
    "gender",
    "specialization",
  ];

  let fields;
  if (req.query.fields) {
    fields = fieldsQueryHandler(req.query, validAttributes);
    if (!fields) return next(new AppError("Invalid query atrributes", 400));
    if (fields.length == 0) fields = undefined;
  }
  delete req.query.fields;

  let orders;

  if (req.query.order) {
    orders = orderQueryHandler(req.query, validAttributes);
    console.log(orders);
    if (!orders) return next(new AppError("Invalid query atrributes", 400));
    if (orders.length == 0) orders = undefined;
  }

  delete req.query.order;

  let filters;
  if (req.query) {
    filters = filterQueryHandler(req.query, validAttributes);
    if (!filters) return next(new AppError("Invalid query atrributes", 400));
    if (filters.length == 0) filters = undefined;
  }

  const doctors = await retrieveAllDoctors(fields, filters, orders);
  res.status(200).json({
    status: "succes",
    ok: true,
    data: { doctors },
  });
});

export { getAllDoctors };
