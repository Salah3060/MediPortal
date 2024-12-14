import validator from "validator";
import {
  retrieveAllDoctors,
  retrieveDoctor,
  reteieveDoctorPatients,
  createAvailability,
  deleteAvailability,
  retrieveDoctorsStats,
} from "../databases/doctorDatabse.js";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";

const validAttributes = [
  "userId",
  "email",
  "phoneNumber",
  "lastName",
  "firstName",
  "gender",
  "specialization",
  "accountState",
];

const getAllDoctors = catchAsyncError(async (req, res, next) => {
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

  const doctors = await retrieveAllDoctors(
    fields,
    filters,
    orders,
    limit,
    page
  );
  res.status(200).json({
    status: "succes",
    ok: true,
    length: doctors.length,
    data: { doctors },
  });
});
const getDoctor = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Please provide doctor Id", 400));
  const doctor = await retrieveDoctor(id);
  res.status(200).json({
    status: "success",
    ok: true,
    data: {
      doctor,
    },
  });
});
const doctorPatients = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const pateints = await reteieveDoctorPatients(id);

  res.status(200).json({
    status: "success",
    ok: true,
    data: { pateints },
  });
});

const addAvailability = catchAsyncError(async (req, res, next) => {
  let { workingDay, startTime, endTime, locationId } = req.body;
  const doctor = req.user;
  const workspaceId = req.params.id;
  if (!workingDay || !startTime || !endTime || !locationId)
    return next(new AppError("Missing data", 400));
  workingDay = formatString(workingDay);

  let attributes = [workingDay, startTime, endTime, locationId];

  const Availability = await createAvailability(
    attributes,
    doctor.userid,
    workspaceId
  );
  if (Availability.status === "fail" || Availability.severity === "ERROR") {
    return next(new AppError(Availability.message || "something went wrong"));
  }
  res.status(200).json({
    status: "successful",
    data: { Availability },
  });
});

const removeAvailability = catchAsyncError(async (req, res, next) => {
  let { workingDay, startTime } = req.body;
  const workspaceId = req.params.id;
  const doctor = req.user;

  if (!workingDay || !startTime || !workspaceId)
    return next(new AppError("Missing data", 400));
  workingDay = formatString(workingDay);
  let attributes = [workingDay, startTime, doctor.userid, workspaceId];

  const deleted = await deleteAvailability(attributes);
  if (!deleted) return next(new AppError("this availability does NOT exist"));
  if (deleted.status === "fail" || deleted.severity === "ERROR") {
    return next(
      new AppError((deleted && deleted.message) || "something went wrong")
    );
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});

const getDoctorsStats = catchAsyncError(async (req, res, next) => {
  const stats = await retrieveDoctorsStats();
  res.status(200).json({
    status: "success",
    ok: true,
    data: { stats },
  });
});

// const editAvailability = catchAsyncError(async (req,res,next)=>{
//   let {workingDay, startTime, endTime, locationId}
// })

export {
  getAllDoctors,
  getDoctor,
  doctorPatients,
  addAvailability,
  removeAvailability,
  getDoctorsStats,
};
