import express from "express";
import { getAllDoctors, getDoctor } from "../controllers/doctorController.js";
const router = express.Router();

router.get("/allDoctors", getAllDoctors);
router.get("/allDoctors/:id", getDoctor);
export default router;
