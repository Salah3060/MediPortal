import express from "express";
import { validateLoggedIn } from "../controllers/authController.js";

const router = express.Router();
router.use("/", validateLoggedIn);

export default router;
