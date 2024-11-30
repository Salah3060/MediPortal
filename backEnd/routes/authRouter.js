import express from "express";
import {
  logInController,
  registerController,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/logIn", logInController);
router.post("/register", registerController);

export default router;
