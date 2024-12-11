import express from "express";
import { getAllDoctors, getDoctor } from "../controllers/doctorController.js";
import {
  validateLoggedIn,
  updateUser,
  restrictTo,
} from "../controllers/authController.js";
const router = express.Router();

router.get("/allDoctors", getAllDoctors);
router.get("/:id", getDoctor);

router.use(validateLoggedIn);
// doctor-side update
router.patch("/updateMe", updateUser("Doctor"));
// admin-side update
router.patch("/:id", restrictTo("Admin"), updateUser("Doctor"));

export default router;
