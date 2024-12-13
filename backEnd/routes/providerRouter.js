import express from "express";
import { getAllProviders } from "../controllers/providerController.js";
const router = express.Router();

router.use(validateLoggedIn, restrictTo("Admin"));
router.get("/allInsurances", getAllInsurances);
router.get("/allProviders", getAllProviders);

export default router;
