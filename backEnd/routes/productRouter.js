import express from "express";
import { getAllProducts } from "../controllers/productController.js";
import { validateLoggedIn } from "../controllers/authController.js";

const router = express.Router();
router.use(validateLoggedIn);

router.get("/allProducts", getAllProducts);

export default router;
