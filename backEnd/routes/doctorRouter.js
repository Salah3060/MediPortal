import express from "express";
import { getAllDoctors } from "../controllers/doctorController.js";
import { validateLogIn } from "../utilities.js";

const router = express.Router();

router.use("/", validateLogIn);
router.get("/allDoctors", getAllDoctors);
export default router;
