import express from "express";
import { getAllOffers } from "../controllers/offerController.js";
const router = express.Router();

router.get("/allOffers", getAllOffers);

export default router;
