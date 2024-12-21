import express from "express";
import { editReview, makeReview } from "../controllers/reviewController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";

const router = express.Router();

//router.use(restrictTo("Patient"))
router.use(validateLoggedIn, restrictTo("Patient"));
router.route("/:id").post(makeReview).patch(editReview);

export default router;
