import express from "express";
import {
  getAllProducts,
  addProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);
router.post("/", addProduct);
export default router;
