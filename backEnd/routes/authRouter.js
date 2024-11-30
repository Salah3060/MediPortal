import express from "express";
import { logInController } from "../controllers/authController.js";
const router = express.Router();

router.post("/logIn", logInController);

export default router;
