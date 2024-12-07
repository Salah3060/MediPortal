import express from "express";
import { getAllInsurances } from "../controllers/insuranceController.js";
const router = express.Router();

router.get("/allInsurances", getAllInsurances);
export default router;
