import { retrieveAllAppointments } from "../databases/appointmentDatabase.js";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";

const validAttributes = [
  "appointmentId",
  "appointmentDate",
  "appointmentStatus",
  "a.fees",
  "bookingDate",
  "paymentStatus",
  "specialization",
  "a.workspaceId",
  "workspaceName",
  "workspaceType",
  "a.doctorId",
  "ud.firstName", // for doctor firstName
  "ud.lastName", // for doctor lastName
  "a.patientId",
  "up.firstName", // for patient name
  "up.lastName", // for patient name
];

const getAllAppointments = catchAsyncError(async (req, res, next) => {
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

  const Appointments = await retrieveAllAppointments(
    fields,
    filters,
    orders,
    limit,
    page
  );
  res.status(200).json({
    status: "succes",
    ok: true,
    data: { Appointments },
  });
});

export { getAllAppointments };
