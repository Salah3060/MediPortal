import express from "express";
import {
  signUpController,
  registerController,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/signUp", signUpController);
router.post("/register", registerController);
export default router;
