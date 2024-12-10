import express from "express";
import {
  getAllDoctors,
  getDoctor,
  doctorPatients,
} from "../controllers/doctorController.js";
const router = express.Router();

router.get("/allDoctors", getAllDoctors);
router.get("/:id", getDoctor);
router.get("/patients/:id", doctorPatients);
export default router;
