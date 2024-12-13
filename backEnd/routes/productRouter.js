import express from "express";
import {
  getAllProducts,
  addProduct,
  editProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);
router.post("/", addProduct);
router.patch("/:id", editProduct);
export default router;
