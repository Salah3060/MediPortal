import express from "express";

import {
  createWorkspace,
  editWorkspace,
  getAllWorkSpaces,
  getAllLocations,
} from "../controllers/workspaceController.js";
import { restrictTo } from "../controllers/authController.js";

const router = express.Router();
router.use(restrictTo("Admin", "Doctor"));
router.post("/", createWorkspace);
router
  .route(["/:id", "/:id/:secId", "/:id/:secId/:thirdId"])
  .patch(editWorkspace);

router.get("/allWorkSpaces", getAllWorkSpaces);
export default router;
