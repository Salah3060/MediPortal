import express from "express";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import {
  placeOrder,
  editOrder,
  getAllorders,
} from "../controllers/orderController.js";

const router = express.Router();
router.use(validateLoggedIn);
router.get("/allOrders", getAllorders);
router.use(restrictTo("Patient"));
router.post("/", placeOrder);
router.patch("/:id", editOrder);
export default router;
