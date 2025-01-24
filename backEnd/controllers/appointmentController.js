import {
  retrieveAllAppointments,
  createAppointmentDb,
  updateAppointment,
  retrieveAppointmentsStats,
} from "../databases/appointmentDatabase.js";
import { retrieveDoctor } from "../databases/doctorDatabse.js";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import app from "../app.js";
import validator from "validator";
dotenv.config();

const validAttributes = [
  "appointmentId",
  "appointmentDate",
  "appointmentStatus",
  "a.fees",
  "bookingDate",
  "paymentStatus",
  "specialization",
  "a.doctorId",
  "ud.firstName", // for doctor firstName
  "ud.lastName", // for doctor lastName
  "a.patientId",
  "up.firstName", // for patient name
  "up.lastName", // for patient name
  "a.workspaceId",
  "a.locationId",
  "wl.workspaceId",
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
    length: Appointments.length,
    data: { Appointments },
  });
});

const getCheckoutSession = catchAsyncError(async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const doctorId = req.params.id;
  const locationId = req.params.secId;
  const doctor = await retrieveDoctor(doctorId);
  const { user } = req;
  let { appointmentDate } = req.body;
  if (!appointmentDate) {
    return next(new AppError("Missing appointment date", 400));
  }
  if (!doctor) {
    return next(new AppError("There is no such a doctor with that id", 400));
  }
  appointmentDate = new Date(appointmentDate).getTime() / 1000;
  const transformedData = [
    {
      quantity: 1,
      price_data: {
        currency: "EGP",
        unit_amount: doctor[0].fees * 100,
        product_data: {
          name: `Appointment with Dr ${doctor[0].firstname} ${doctor[0].lastname} `,
          metadata: {
            date: Date.now(),
            locationId: locationId,
            appointmentDate,
          },
        },
      },
    },
  ];

  console.log(appointmentDate);
  // 2) Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // success_url: `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/appointments/booking-success?date=${appointmentDate}&fees=${
    //   doctor[0].fees
    // }&docId=${doctorId}&locId=${locationId}&userId=${user.userid}`,
    success_url: `https://medi-portal-bay.vercel.app`,
    cancel_url: `https://medi-portal-bay.vercel.app`,
    customer_email: req.user.email,
    client_reference_id: doctorId,
    line_items: transformedData,
    mode: "payment",
  });

  delete doctor.availibility;
  // 3) Send session as a responce
  res.status(200).json({
    states: "success",
    session,
    doctor,
  });
});

// const createAppointmentCheckout = catchAsyncError(async (req, res, next) => {
//   let { date, fees, docId, locId, userId } = req.query;
//   console.log(date, fees, docId, locId);
//   date = new Date(date * 1000).toISOString().split("T")[0];

//   if (!date || !fees || !docId || !locId || !userId)
//     return next(new AppError("Missing data", 400));

//   let attributes = [
//     date,
//     "Scheduled",
//     fees,
//     "Online",
//     Date.now(),
//     userId,
//     docId,
//   ];

//   const appointment = await createAppointmentDb(attributes, locId);
//   if (
//     !appointment ||
//     appointment.severity === "ERROR" ||
//     appointment.status === "fail"
//   ) {
//     return next(new AppError("Something wrong happened", 400));
//   }

//   //res.redirect(req.originalUrl.split("?")[0]);
//   res.redirect("https://medi-portal-bay.vercel.app");
// });

const createAppointmentCheckout = async (session, userId) => {
  // const { user } = req;
  // date = new Date(date * 1000).toISOString().split("T")[0];
  console.log(session, "session");
  let attributes = [
    // date,
    "2021-09-01",
    "Scheduled",
    session.amount_total / 100,
    "Online",
    Date.now(),
    // user.userid,
    userId,
    session.client_reference_id,
  ];

  console.log(attributes);
  const appointment = await createAppointmentDb(attributes, locId);
  if (
    !appointment ||
    appointment.severity === "ERROR" ||
    appointment.status === "fail"
  ) {
    return next(new AppError("Something wrong happened", 400));
  }
};

const webhookCheckout = catchAsyncError(async (req, res, next) => {
  console.log(123, "webhookCheckout");
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
  console.log(event);
  if (event.type === "checkout.session.completed") {
    console.log("Payment was successful");
    createAppointmentCheckout(event.data.object, 256);
  }
  res.status(200).json({ received: true });
});

const bookAppointment = catchAsyncError(async (req, res, next) => {
  let { appointmentDate, fees, paymentStatus } = req.body;
  const doctorId = req.params.id;
  const locationId = req.params.secId;
  const { user } = req;

  if (!appointmentDate || !fees || !paymentStatus || !doctorId || !locationId) {
    return next(new AppError("Missing data", 400));
  }
  if (!user) {
    return next(new AppError("Please log in to use this route", 401));
  }
  paymentStatus = formatString(paymentStatus);
  let attributes = [
    appointmentDate,
    "Scheduled",
    fees,
    paymentStatus,
    Date.now(),
    user.userid,
    doctorId,
  ];
  // console.log(user);
  const appointment = await createAppointmentDb(attributes, locationId);
  if (!appointment || appointment.status === "fail")
    return next(new AppError("Something wronge happened", 400));
  console.log(appointment);
  res.status(200).json({
    status: "successful",
    data: {
      appointment,
    },
  });
});

const editAppointment = catchAsyncError(async (req, res, next) => {
  let { appointmentDate, appointmentStatus, fees, paymentStatus, locationId } =
    req.body;
  appointmentStatus = appointmentStatus
    ? formatString(appointmentStatus)
    : null;
  const appointmentId = req.params.id;
  paymentStatus = paymentStatus ? formatString(paymentStatus) : null;
  if (fees && !validator.isNumeric(fees)) {
    return next(new AppError("Fees must be a number", 400));
  }
  let toBeEdited = {};
  toBeEdited.appointmentDate = appointmentDate;
  toBeEdited.appointmentStatus = appointmentStatus;
  toBeEdited.fees = fees;
  toBeEdited.paymentStatus = paymentStatus;
  toBeEdited.locationId = locationId;

  if (!Object.values(toBeEdited).filter((v) => v).length)
    return next(new AppError("Specify at least one attribute to update"));
  const updatedAppointment = await updateAppointment(toBeEdited, appointmentId);

  if (!updatedAppointment) {
    return next(new AppError("This appointment does not exist", 400));
  }
  if (updatedAppointment.status === "fail") {
    return next(new AppError("something went very wrong", 400));
  }
  res.status(200).json({
    status: "successful",
    data: {
      updatedAppointment,
    },
  });
});
const getAppointmentsStats = catchAsyncError(async (req, res, next) => {
  let filters;
  if (req.query) {
    filters = filterQueryHandler(req.query, validAttributes);
    if (!filters) return next(new AppError("Invalid query atrributes", 400));
    if (filters.length == 0) filters = undefined;
  }
  const stats = await retrieveAppointmentsStats(filters);
  res.status(200).json({
    status: "success",
    ok: true,
    data: {
      stats,
    },
  });
});
export {
  getAllAppointments,
  bookAppointment,
  getCheckoutSession,
  editAppointment,
  getAppointmentsStats,
  createAppointmentCheckout,
  webhookCheckout,
};
