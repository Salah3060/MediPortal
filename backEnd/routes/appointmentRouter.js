import express from "express";
import { getAllAppointments } from "../controllers/appointmentController.js";
const router = express.Router();

router.get("/allAppointments", getAllAppointments);

export default router;
