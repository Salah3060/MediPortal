import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";

import {
  retrieveAllOffers,
  createOfferDb,
  updateOfferDb,
  deleteOffer,
} from "../databases/offerDatabase.js";
import app from "../app.js";
import validator from "validator";

const validAttributes = [
  "percentage",
  "startDate",
  "endDate",
  "specialization",
  "workspaceName",
  "workspaceType",
  "offerId",
  "doctorId",
  "firstName",
  "lastName",
  "offerName",
];
const getAllOffers = catchAsyncError(async (req, res, next) => {
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
  const offers = await retrieveAllOffers(fields, filters, orders, limit, page);
  res.status(200).json({
    status: "success",
    ok: true,
    data: { offers },
  });
});

const createOffer = catchAsyncError(async (req, res, next) => {
  try {
    let { percentage, startDate, endDate, offerDescription, offerName } =
      req.body;
    const workspaceId = req.params.id;
    const doctor = req.user;
    if (
      !percentage ||
      !startDate ||
      !endDate ||
      !workspaceId ||
      !offerDescription ||
      !offerName
    ) {
      return next(new AppError("Missing data", 400));
    }
    if (!doctor) {
      return next(new AppError("Please login to preceed", 401));
    }
    if (!validator.isNumeric(percentage)) {
      return next(new AppError("percentage must be a number", 400));
    }
    offerDescription = offerDescription.trim();
    offerName = formatString(offerName);
    const attributes = [
      percentage,
      startDate,
      endDate,
      doctor.userid,
      workspaceId,
      offerDescription,
      offerName,
    ];
    const offer = await createOfferDb(attributes);
    console.log(offer);
    if (offer.severity === "ERROR") {
      return next(new AppError("Somthing went very wrong", 400));
    }
    res.status(200).json({
      status: "success",
      data: { offer },
    });
  } catch (error) {
    console.log(error);
  }
});

const updateOffer = catchAsyncError(async (req, res, next) => {
  try {
    let {
      percentage,
      startDate,
      endDate,
      workspaceId,
      offerDescription,
      offerName,
    } = req.body;
    const offerId = req.params.id;
    if (!offerId) {
      return next(
        new AppError("An id must be provided to update an offer", 400)
      );
    }
    let offerImg = null;
    if (req.url) {
      //checking if there is an existing photo to delete it

      //uploading the new img
      offerImg = req.url;
    }
    offerDescription = offerDescription ? offerDescription.trim() : null;
    offerName = offerName ? formatString(offerName) : null;

    let toBeEdited = {};
    toBeEdited.percentage = percentage;
    toBeEdited.startDate = startDate;
    toBeEdited.endDate = endDate;
    toBeEdited.workspaceId = workspaceId;
    toBeEdited.offerDescription = offerDescription;
    toBeEdited.offerName = offerName;
    toBeEdited.offerImg = offerImg;

    const updatedOffer = await updateOfferDb(offerId, toBeEdited);
    if (!updatedOffer) {
      return next(new AppError("there is no such an offer with that id", 400));
    }
    if (updatedOffer.severity === "ERROR") {
      return next(new AppError("Somthing went very wrong", 400));
    }
    res.status(200).json({
      status: "success",
      data: { updatedOffer },
    });
    // console.log(updatedOffer);
  } catch (error) {
    console.log(error);
  }
});

const removeOffer = catchAsyncError(async (req, res, next) => {
  const offerId = req.params.id;

  const deleted = await deleteOffer(offerId);
  if (!deleted) return next(new AppError("this offer does NOT exist"));
  if (deleted.status === "fail" || deleted.severity === "ERROR") {
    return next(
      new AppError((deleted && deleted.message) || "something went wronge")
    );
  }
  res.status(200).json({
    status: "success",
    data: null,
  });
});
export { getAllOffers, createOffer, updateOffer, removeOffer };
