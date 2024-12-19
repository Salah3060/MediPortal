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
  retieveAppointmentsTotoalMoney,
  retieveOrdersTotoalMoney,
} from "../databases/statsDatabase.js";

const getStats = catchAsyncError(async (req, res, next) => {
  const { ordersnumber } = await retrieveTableSize("Orders");
  const { workspacesnumber } = await retrieveTableSize("workSpaces");
  const { appointmentsnumber } = await retrieveTableSize("Appointments");
  const { usersnumber } = await retrieveTableSize("Users");
  const { appointmentstotoalmoney } = await retieveAppointmentsTotoalMoney();
  const { orderstotalmoney } = await retieveOrdersTotoalMoney();

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
      appointmentstotoalmoney,
      orderstotalmoney,
      AppointmentsMonthly,
      ordersMonthly,
    },
  });
});

export { getStats };
