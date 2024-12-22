import express from "express";
import {
  getAllPatients,
  getPatientsStats,
} from "../controllers/patientController.js";
import {
  restrictTo,
  updateUser,
  validateLoggedIn,
} from "../controllers/authController.js";
import { uploadPhoto, upploadToCloud } from "../utilities.js";

const router = express.Router();

router.use(validateLoggedIn);
router.get("/allPatients", restrictTo("Admin", "Doctor"), getAllPatients);
router.get("/stats", restrictTo("Admin"), getPatientsStats);

// doctor-side update
router.patch(
  "/updateMe",
  restrictTo("Patient"),
  uploadPhoto,
  upploadToCloud,
  updateUser("Patient")
);

// admin-side update
router.patch("/:id", restrictTo("Admin"), updateUser("Patient"));

export default router;
