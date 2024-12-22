import express from "express";
import {
  addInsurance,
  addInsuranceProvider,
  editInsurance,
  editInsuranceProvided,
  getAllInsurances,
} from "../controllers/insuranceController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
const router = express.Router();

router.use(validateLoggedIn);
router.get("/allInsurances", getAllInsurances);

router.use(restrictTo("Admin"));
router.post("/provider", addInsuranceProvider);
router.post("/:id", addInsurance);
router.patch("/:id", editInsurance);
router.patch("/provider/:id", editInsuranceProvided);
export default router;
