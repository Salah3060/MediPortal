import express from "express";
import {
  getAllQuestion,
  askQuestion,
  answerQuestion,
} from "../controllers/questionController.js";
import { validateLoggedIn } from "../controllers/authController.js";
const router = express.Router();

router.get("/allQuestions", getAllQuestion);
router.post("/", askQuestion);
router.patch("/:id", answerQuestion);

export default router;
