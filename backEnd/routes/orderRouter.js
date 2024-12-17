import express from "express";
import { validateLoggedIn } from "../controllers/authController.js";
import {
  placeOrder,
  editOrder,
  getAllorders,
} from "../controllers/orderController.js";

const router = express.Router();
router.use(validateLoggedIn);
router.post("/", placeOrder);
router.get("/allOrders", getAllorders);
router.patch("/:id", editOrder);
export default router;
