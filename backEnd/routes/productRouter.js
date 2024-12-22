import express from "express";
import {
  getAllProducts,
  addProduct,
  editProduct,
} from "../controllers/productController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import { uploadPhoto, upploadToCloud } from "../utilities.js";
const router = express.Router();
router.get("/allProducts", getAllProducts);
router.use(validateLoggedIn, restrictTo("Admin"));
router.post("/", addProduct);
router.patch("/:id", uploadPhoto, upploadToCloud, editProduct);
export default router;
