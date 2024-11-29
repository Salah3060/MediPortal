import express from "express";
import { getAllPatients } from "../controllers/patientController.js";

const router = express.Router();

router.get("/allPatients", getAllPatients);

export default router;
