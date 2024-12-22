import express from "express";

import {
  createWorkspace,
  editWorkspace,
  getAllWorkSpaces,
  getAllLocations,
} from "../controllers/workspaceController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";

const router = express.Router();
router.get("/allWorkSpaces", getAllWorkSpaces);
router.use(validateLoggedIn);
router.use(restrictTo("Admin", "Doctor"));
router.post("/", createWorkspace);
router
  .route(["/:id", "/:id/:secId", "/:id/:secId/:thirdId"])
  .patch(editWorkspace);
export default router;
