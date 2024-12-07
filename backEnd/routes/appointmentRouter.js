import express from "express";
import {
  getAllAppointments,
  bookAppointment,
  getCheckoutSession,
} from "../controllers/appointmentController.js";
import { validateLoggedIn } from "../controllers/authController.js";

const router = express.Router();

router.get("/allAppointments", getAllAppointments);

router.use(validateLoggedIn);
router.get("/checkout-session/:id", getCheckoutSession);
router.post("/:id/:secId", bookAppointment);
export default router;