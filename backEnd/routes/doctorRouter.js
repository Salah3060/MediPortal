import express from "express";
import { getAllDoctors } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/allDoctors", getAllDoctors);
export default router;
