import express from "express";

import {
  createWorkspace,
  editWorkspace,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.post("/", createWorkspace);
router.route("/:id").patch(editWorkspace);

export default router;
