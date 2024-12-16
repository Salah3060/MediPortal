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
  const orders = await retrieveTableSize("Orders");
  const workspaces = await retrieveTableSize("workSpaces");
  const appointments = await retrieveTableSize("Appointments");
  const users = await retrieveTableSize("Users");
  const AppointmentsMonthly = await retrieveAppointmentsMonthlyStats();
  const ordersMonthly = await retrieveOrdersMonthlyStats();
  console.log(AppointmentsMonthly);
  console.log(ordersMonthly);
  console.log(orders, workspaces, appointments, users);
  res.status(200).json({
    status: "success",
    ok: true,
    data: {
      orders,
      workspaces,
      appointments,
      users,
    },
  });
});

export { getStats };
