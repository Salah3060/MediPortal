import express from "express";
import {
  getAllQuestion,
  askQuestion,
  answerQuestion,
  editQuestion,
} from "../controllers/questionController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
const router = express.Router();

router.use(validateLoggedIn);
router.get("/allQuestions", getAllQuestion);
router.patch("/answer/:id", restrictTo("Doctor"), answerQuestion);

router.use(restrictTo("Patient"));
router.post("/", askQuestion);
router.patch("/:id", editQuestion);
export default router;
