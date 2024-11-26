import express from "express";
import { signUpController } from "../controllers/authController.js";
const router = express.Router();

router.post("/signUp", signUpController);

export default router;