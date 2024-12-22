import express from "express";
import {
  getAllProducts,
  addProduct,
  editProduct,
} from "../controllers/productController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import { uploadPhoto, uploadToCloud } from "../utilities.js";
const router = express.Router();
router.get("/allProducts", getAllProducts);
router.use(validateLoggedIn, restrictTo("Admin"));
router.post("/", addProduct);
router.patch("/:id", uploadPhoto, uploadToCloud, editProduct);
export default router;
