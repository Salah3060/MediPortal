import express from "express";

import {
  createCategory,
  editCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";

const router = express.Router();
router.use(validateLoggedIn, restrictTo("Admin"));
router.get("/allCategories", getAllCategories);
router.post("/", createCategory);
router.patch("/:id", editCategory);
export default router;
