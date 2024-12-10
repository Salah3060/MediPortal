import express from "express";
import {
  getAllDoctors,
  getDoctor,
  doctorStatistics,
} from "../controllers/doctorController.js";
const router = express.Router();

router.get("/allDoctors", getAllDoctors);
router.get("/:id", getDoctor);
router.get("/statistics/:id", doctorStatistics);
export default router;
