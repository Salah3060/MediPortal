import express from "express";
import {
  getAllProducts,
  addProduct,
  editProduct,
} from "../controllers/productController.js";
import { restrictTo } from "../controllers/authController.js";

const router = express.Router();
router.use(restrictTo("Admin"));
router.get("/allProducts", getAllProducts);
router.post("/", addProduct);
router.patch("/:id", editProduct);
export default router;
