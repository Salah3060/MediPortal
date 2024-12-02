import express from "express";

import {
  createWorkspace,
  editWorkspace,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.post("/", createWorkspace);
router
  .route(["/:id", "/:id/:secId", "/:id/:secId/:thirdId"])
  .patch(editWorkspace);

export default router;
