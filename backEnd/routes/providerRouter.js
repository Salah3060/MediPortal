import express from "express";
import { getAllProviders } from "../controllers/providerController.js";
import { validateLoggedIn, restrictTo } from "../controllers/authController.js";
const router = express.Router();

router.use(validateLoggedIn, restrictTo("Admin"));
router.get("/allProviders", getAllProviders);

export default router;
