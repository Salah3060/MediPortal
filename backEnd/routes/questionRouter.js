import express from "express";
import {
  getAllQuestion,
  askQuestion,
  answerQuestion,
  editQuestion,
} from "../controllers/questionController.js";
import { validateLoggedIn } from "../controllers/authController.js";
const router = express.Router();

router.use(validateLoggedIn);
router.get("/allQuestions", getAllQuestion);
router.post("/", askQuestion);
router.patch("answer/:id", answerQuestion);
router.patch("/:id", editQuestion);
export default router;
