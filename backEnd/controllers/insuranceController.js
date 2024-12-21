import {
  retrieveAllInsurances,
  createInsuranceProvider,
  createInsurance,
  updateInsurance,
  updateInsuranceProvider,
} from "../databases/insuranceDatabase.js";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";

const validAttributes = [
  "i.insuranceId",
  "i.startDate",
  "i.duration",
  "i.providerId",
];

const getAllInsurances = catchAsyncError(async (req, res, next) => {
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

  const Insurances = await retrieveAllInsurances(
    fields,
    filters,
    orders,
    limit,
    page
  );
  res.status(200).json({
    status: "succes",
    ok: true,
    data: { Insurances },
  });
});

const addInsurance = catchAsyncError(async (req, res, next) => {
  let { startDate, duration, workspaceId, insuranceName } = req.body;
  const providerId = req.params.id;
  if (!startDate || !duration || !workspaceId || !insuranceName) {
    return next(new AppError("Missing data", 400));
  }
  let attributes = [startDate, duration, insuranceName];
  const insurance = await createInsurance(attributes, providerId, workspaceId);
  if (insurance.status === "fail" || insurance.severity === "ERROR") {
    return next(new AppError(insurance.message || "something went wrong"));
  }
  res.status(200).json({
    status: "successful",
    data: { insurance },
  });
});

const addInsuranceProvider = catchAsyncError(async (req, res, next) => {
  let { providerName, providerLocation, providerPhone } = req.body;
  if (!providerName || !providerLocation || !providerPhone) {
    return next(new AppError("Missing data", 400));
  }
  providerName = formatString(providerName);
  providerLocation = providerLocation.trim();
  providerPhone = providerPhone.replaceAll(" ", "");

  let attributes = [providerName, providerLocation, providerPhone];
  const insuranceProvider = await createInsuranceProvider(attributes);
  if (
    insuranceProvider.status === "fail" ||
    insuranceProvider.severity === "ERROR"
  ) {
    return next(
      new AppError(insuranceProvider.message || "something went wrong")
    );
  }
  res.status(200).json({
    status: "successful",
    data: { insuranceProvider },
  });
});

const editInsurance = catchAsyncError(async (req, res, next) => {
  let { startDate, duration } = req.body;
  const insuranceId = req.params.id;
  let toBeEdited = {};
  toBeEdited.startDate = startDate;
  toBeEdited.duration = duration;

  const updatedInsurance = await updateInsurance(toBeEdited, insuranceId);
  if (
    updatedInsurance.status === "fail" ||
    updatedInsurance.severity === "ERROR"
  ) {
    return next(
      new AppError(updatedInsurance.message || "something went wrong")
    );
  }
  res.status(200).json({
    status: "successful",
    data: { updatedInsurance },
  });
});

const editInsuranceProvided = catchAsyncError(async (req, res, next) => {
  let { providerName, providerLocation, providerPhone } = req.body;
  const providerId = req.params.id;

  providerName = providerName ? formatString(providerName) : null;
  providerLocation = providerLocation ? providerLocation.trim() : null;
  providerPhone = providerPhone ? providerPhone.replaceAll(" ", "") : null;

  let toBeEdited = {};
  toBeEdited.providerName = providerName;
  toBeEdited.providerLocation = providerLocation;
  toBeEdited.providerPhone = providerPhone;

  const updatedProvider = await updateInsuranceProvider(toBeEdited, providerId);
  if (
    updatedProvider.status === "fail" ||
    updatedProvider.severity === "ERROR"
  ) {
    return next(
      new AppError(updatedProvider.message || "something went wrong")
    );
  }
  res.status(200).json({
    status: "successful",
    data: { updatedProvider },
  });
});

export {
  getAllInsurances,
  addInsurance,
  addInsuranceProvider,
  editInsurance,
  editInsuranceProvided,
};
