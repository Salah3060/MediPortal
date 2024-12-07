import express from "express";
import { getAllQuestion } from "../controllers/questionController.js";
const router = express.Router();

router.get("/allQuestions", getAllQuestion);

export default router;
