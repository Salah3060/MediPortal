import express from "express";

import {
  createCategory,
  editCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

const router = express.Router();
router.get("/allCategories", getAllCategories);
router.post("/", createCategory);
router.patch("/:id", editCategory);
export default router;
