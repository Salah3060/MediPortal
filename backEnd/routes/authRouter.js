import express from "express";
import {
  logInController,
  registerController,
  sendEmailVerificationCode,
  resstPassword,
} from "../controllers/authController.js";
const router = express.Router();

router.get("/forgetPassword/:email", sendEmailVerificationCode);
router.post("/resetPassword/:email", resstPassword);

router.post("/logIn", logInController);
router.post("/register", registerController);

export default router;
