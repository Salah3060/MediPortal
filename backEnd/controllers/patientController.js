import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";
import { retrieveAllPatients } from "../databases/patientDatabase.js";
import { retrieveUsersStats } from "../databases/statsDatabase.js";
const validAttributes = [
  "userId",
  "email",
  "phoneNumber",
  "lastName",
  "firstName",
  "gender",
  "accountState",
];

const getAllPatients = catchAsyncError(async (req, res, next) => {
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

  let limit = req.query.limit || 50;
  let page = req.query.page || 1;

  delete req.query.limit;
  delete req.query.page;

  let filters;
  if (req.query) {
    filters = filterQueryHandler(req.query, validAttributes);
    if (!filters) return next(new AppError("Invalid query atrributes", 400));
    if (filters.length == 0) filters = undefined;
  }
  console.log(filters);

  const patients = await retrieveAllPatients(
    fields,
    filters,
    orders,
    limit,
    page
  );

  res.status(200).json({
    status: "success",
    ok: true,
    data: { patients },
  });
});

const getPatientsStats = catchAsyncError(async (req, res, next) => {
  const stats = await retrieveUsersStats("Patient");
  res.status(200).json({
    status: "success",
    ok: true,
    data: { stats },
  });
});

export { getAllPatients, getPatientsStats };
