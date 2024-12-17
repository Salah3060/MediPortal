import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";
import {
  retrieveAppointmentsMonthlyStats,
  retrieveOrdersMonthlyStats,
  retrieveTableSize,
} from "../databases/statsDatabase.js";

const getStats = catchAsyncError(async (req, res, next) => {
  const { ordersnumber } = await retrieveTableSize("Orders");
  const { workspacesnumber } = await retrieveTableSize("workSpaces");
  const { appointmentsnumber } = await retrieveTableSize("Appointments");
  const { usersnumber } = await retrieveTableSize("Users");
  const AppointmentsMonthly = await retrieveAppointmentsMonthlyStats();

  const ordersMonthly = await retrieveOrdersMonthlyStats();
  res.status(200).json({
    status: "success",
    ok: true,
    data: {
      ordersnumber,
      workspacesnumber,
      appointmentsnumber,
      usersnumber,
      AppointmentsMonthly,
      ordersMonthly,
    },
  });
});

export { getStats };
