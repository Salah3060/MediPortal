import express from "express";
import {
  logInController,
  registerController,
  sendEmailVerificationCode,
  resetPassword,
  changePassword,
  validateLoggedIn,
  verifyCode,
  checkVerificationCode,
  updateUser,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/checkVerificationCode/:email", checkVerificationCode);
router.get("/forgetPassword/:email", sendEmailVerificationCode);
router.post("/resetPassword/:email", resetPassword);
router.post("/logIn", logInController);
router.post("/register", registerController);
router.get("/verifyCode/:code/:id", verifyCode);

router.use(validateLoggedIn);
router.patch("/updateMe", updateUser("Admin"));
router.patch("/updatePassword", changePassword);
export default router;
