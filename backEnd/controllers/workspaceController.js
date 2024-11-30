import validator from "validator";
import { AppError } from "../utilities.js";
const createWorkspace = async (req, res, next) => {
  try {
    const { workspaceName, workspaceType } = req.body;

    if (!workspaceName || !workspaceType) {
      return new AppError("Missing data", 400);
    }
    if (!validator.isAlphanumeric(workspaceName)) {
      return new AppError("Please provide a valid workspace name", 400);
    }
    workspaceName = workspaceName.trim();
    workspaceType = workspaceType.trim();
    workspaceType =
      workspaceType[0].toUpperCase() + workspaceType.slice(1).toLowerCase();
    if (
      !validator.isAlpha(workspaceType) ||
      !(workspaceType === "Hospital" || workspaceName === "Clinic")
    ) {
      return new AppError("Please provide a valid workspace Type", 400);
    }
  } catch (err) {
    console.log(err);
  }
};
