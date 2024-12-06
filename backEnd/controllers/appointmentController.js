import {
  retrieveAllAppointments,
  createAppointmentDb,
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
dotenv.config("../../BE.env");

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

const getCheckoutSession = catchAsyncError(async (req, res, next) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const doctorId = req.params.id;
  const doctor = await retrieveDoctor(doctorId);
  if (!doctor) {
    return next(new AppError("There is no such a doctor with that id", 400));
  }

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
          },
        },
      },
    },
  ];

  // 2) Create the checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `https://placehold.co/1000/white/green?text=Successful&font=roboto`,
    cancel_url: `https://placehold.co/1000/white/red?text=canceled&font=roboto`,
    customer_email: req.user.email,
    client_reference_id: doctorId,
    line_items: transformedData,
    mode: "payment",
  });

  // 3) Send session as a responce
  res.status(200).json({
    states: "success",
    session,
  });
});

const bookAppointment = catchAsyncError(async (req, res, next) => {
  try {
    let { appointmentDate, fees, paymentStatus } = req.body;
    const doctorId = req.params.id;
    const workspaceId = req.params.secId;
    const { user } = req;

    if (
      !appointmentDate ||
      !fees ||
      !paymentStatus ||
      !doctorId ||
      !workspaceId
    ) {
      return next(new AppError("Missing data", 400));
    }
    if (!user) {
      return next(new AppError("Please log in to use this route", 401));
    }
    paymentStatus = formatString(paymentStatus);
    let attributes = [
      appointmentDate,
      "Successful",
      fees,
      paymentStatus,
      Date.now(),
      user.userid,
      doctorId,
      workspaceId,
    ];
    // console.log(user);
    const appointment = await createAppointmentDb(attributes);
    if (!appointment)
      return next(new AppError("Something wronge happened", 400));
    res.status(200).json({
      status: "successful",
      data: {
        appointment,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

export { getAllAppointments, bookAppointment, getCheckoutSession };
