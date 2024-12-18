import express from "express";
import {
  getAllAppointments,
  bookAppointment,
  getCheckoutSession,
  editAppointment,
  getAppointmentsStats,
  createAppointmentCheckout,
} from "../controllers/appointmentController.js";
import { validateLoggedIn, restrictTo } from "../controllers/authController.js";

const router = express.Router();

router.use(validateLoggedIn);
router.get("/stats", getAppointmentsStats);
router.get("/allAppointments", getAllAppointments);

router.get("/", createAppointmentCheckout);
router.get("/checkout-session/:id/:secId", getCheckoutSession);
router.post("/:id/:secId", bookAppointment);
router.patch("/:id", editAppointment);
export default router;
