import express from "express";
import { validateLoggedIn } from "../controllers/authController.js";
import { placeOrder, editOrder } from "../controllers/orderController.js";

const router = express.Router();
router.use(validateLoggedIn);
router.post("/", placeOrder);
router.patch("/:id", editOrder);
export default router;
