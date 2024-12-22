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

router.get("/booking-success", createAppointmentCheckout);

router.use(validateLoggedIn);
router.get("/stats", getAppointmentsStats);
router.get("/allAppointments", getAllAppointments);

router.patch("/:id", restrictTo("Admin", "Doctor"), editAppointment);

router.use(restrictTo("Patient"));
router.post("/checkout-session/:id/:secId", getCheckoutSession);
router.post("/:id/:secId", bookAppointment);
export default router;
