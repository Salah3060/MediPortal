import express from "express";
import { getAllInsurances } from "../controllers/insuranceController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
const router = express.Router();

router.use(validateLoggedIn, restrictTo("Admin"));
router.get("/allInsurances", getAllInsurances);
export default router;
