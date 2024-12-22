import express from "express";
import {
  getAllOffers,
  createOffer,
  updateOffer,
  removeOffer,
} from "../controllers/offerController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import { uploadPhoto, uploadToCloud } from "../utilities.js";
const router = express.Router();

router.get("/allOffers", getAllOffers);

router.use(validateLoggedIn, restrictTo("Doctor"));
router
  .route("/:id")
  .post(createOffer)
  .patch(uploadPhoto, uploadToCloud, updateOffer)
  .delete(removeOffer);

export default router;
