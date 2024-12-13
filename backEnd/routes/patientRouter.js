import express from "express";
import { getAllPatients } from "../controllers/patientController.js";
import {
  restrictTo,
  updateUser,
  validateLoggedIn,
} from "../controllers/authController.js";

const router = express.Router();

router.use(validateLoggedIn);
router.get("/allPatients", restrictTo("Admin", "Doctor"), getAllPatients);

// doctor-side update
router.patch("/updateMe", updateUser("Patient"));

// admin-side update
router.patch("/:id", restrictTo("Admin"), updateUser("Patient"));

export default router;
