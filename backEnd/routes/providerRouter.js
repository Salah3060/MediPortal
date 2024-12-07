import express from "express";
import { getAllProviders } from "../controllers/providerController.js";
const router = express.Router();

router.get("/allProviders", getAllProviders);

export default router;
