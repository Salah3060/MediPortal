import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
} from "../utilities.js";

import { retrieveAllOffers } from "../databases/offerDatabase.js";

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

export { getAllOffers };
