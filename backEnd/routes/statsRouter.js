import express from "express";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import { getStats } from "../controllers/statsController.js";

const router = express.Router();

router.use(validateLoggedIn);

router.get("/", getStats);

export default router;
