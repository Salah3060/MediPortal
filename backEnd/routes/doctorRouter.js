import express from "express";
import {
  getAllDoctors,
  getDoctor,
  doctorPatients,
  addAvailability,
  removeAvailability,
  getDoctorsStats,
  getDoctorWorkspaces,
} from "../controllers/doctorController.js";
import {
  validateLoggedIn,
  updateUser,
  restrictTo,
} from "../controllers/authController.js";
const router = express.Router();

router.get("/allDoctors", getAllDoctors);
router.get("/stats", getDoctorsStats);
router.get("/workspaces/:id", getDoctorWorkspaces);
router.get("/:id", getDoctor);

router.use(validateLoggedIn);

router.get("/patients/:id", restrictTo("Admin", "Doctor"), doctorPatients);

router
  .route("/availability/:id")
  .post(addAvailability)
  .delete(removeAvailability);

// doctor-side update
router.patch("/updateMe", updateUser("Doctor"));
// admin-side update
router.patch("/:id", restrictTo("Admin"), updateUser("Doctor"));

export default router;
