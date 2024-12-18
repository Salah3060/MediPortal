import express from "express";

import {
  createWorkspace,
  editWorkspace,
  getAllWorkSpaces,
  getAllLocations,
} from "../controllers/workspaceController.js";

const router = express.Router();
router.post("/", createWorkspace);
router
  .route(["/:id", "/:id/:secId", "/:id/:secId/:thirdId"])
  .patch(editWorkspace);

router.get("/allWorkSpaces", getAllWorkSpaces);
export default router;
