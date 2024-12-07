import express from "express";
import {
  getAllOffers,
  createOffer,
  updateOffer,
} from "../controllers/offerController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
const router = express.Router();

router.get("/allOffers", getAllOffers);

router.use(validateLoggedIn, restrictTo("Doctor"));
router.post("/:id", createOffer);
router.patch("/:id", updateOffer);
export default router;
