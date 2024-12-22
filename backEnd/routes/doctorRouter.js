import express from "express";
import {
  getAllDoctors,
  getDoctor,
  doctorPatients,
  addAvailability,
  removeAvailability,
  getDoctorsStats,
  getDoctorWorkspaces,
  getAllSpecializaions,
  getDoctorReviews,
} from "../controllers/doctorController.js";
import {
  validateLoggedIn,
  updateUser,
  restrictTo,
} from "../controllers/authController.js";
import { uploadPhoto, uploadToCloud } from "../utilities.js";
const router = express.Router();

router.get("/allDoctors", getAllDoctors);
router.get("/reviews/:id", getDoctorReviews);
router.get("/allSpecializaions", getAllSpecializaions);
router.get("/stats", getDoctorsStats);
router.get("/workspaces/:id", getDoctorWorkspaces);
router.get("/:id", getDoctor);

router.use(validateLoggedIn);

router.get("/patients/:id", restrictTo("Admin", "Doctor"), doctorPatients);
// doctor-side update
router.patch("/updateMe", uploadPhoto, uploadToCloud, updateUser("Doctor"));

// admin-side update
router.patch("/:id", updateUser("Doctor"));

router.use(restrictTo("Doctor"));
router
  .route("/availability/:id")
  .post(addAvailability)
  .delete(removeAvailability);

export default router;
