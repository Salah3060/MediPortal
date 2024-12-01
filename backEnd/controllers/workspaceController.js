import validator from "validator";
import { AppError, formatString } from "../utilities.js";
import {
  createWorkspaceDb,
  editWorkspaceDb,
} from "../databases/workspaceDatabase.js";

const validateAttributes = (workspaceName, workspaceType, workspacePhone) => {
  if (workspaceName) {
    const NameChecker = workspaceName.replaceAll(" ", "");
    console.log(NameChecker);
    if (!validator.isAlphanumeric(NameChecker, "en-US")) {
      return new AppError("Please provide a valid workspace name", 400);
    }
  }
  if (workspaceType) {
    if (
      !validator.isAlpha(workspaceType) ||
      !(workspaceType === "Hospital" || workspaceType === "Clinic")
    ) {
      return new AppError("Please provide a valid workspace Type", 400);
    }
  }
  if (workspacePhone) {
    if (
      !(
        workspacePhone.length === 10 ||
        workspacePhone.length === 11 ||
        workspacePhone.length === 13 ||
        workspacePhone.length === 14
      ) ||
      !(
        workspacePhone.startsWith("01") ||
        workspacePhone.startsWith("+2") ||
        workspacePhone.startsWith("002") ||
        workspacePhone.startsWith("02")
      )
    ) {
      return new AppError("Please provide a valid phone number", 400);
    }
  }
  return false;
};

const createWorkspace = async (req, res, next) => {
  try {
    let { workspaceName, workspaceType, workspacePhone, workspaceLocation } =
      req.body;

    if (
      !workspaceName ||
      !workspaceType ||
      !workspacePhone ||
      !workspaceLocation
    ) {
      return next(new AppError("Missing data", 400));
    }
    // preparation
    workspaceName = workspaceName.trim();
    workspaceType = formactString(workspaceType);
    workspaceLocation = workspaceLocation.trim();
    workspacePhone = workspacePhone.replaceAll(" ", "");

    validateAttributes(workspaceName, workspaceType, workspacePhone, next);

    const workspace = await createWorkspaceDb(
      workspaceName,
      workspaceType,
      workspacePhone,
      workspaceLocation
    );
    res.status(200).json({
      status: "success",
      data: {
        workspace,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const editWorkspace = async (req, res, next) => {
  try {
    let { workspaceName, workspaceType, workspacePhone, workspaceLocation } =
      req.body;
    const workspaceId = req.params.id;
    if (!workspaceId) {
      return next(
        new AppError("An id must be provided to update an entity", 400)
      );
    }
    // preparation
    workspaceName = workspaceName ? workspaceName.trim() : null;
    workspaceType = workspaceType ? formactString(workspaceType) : null;
    workspacePhone = workspacePhone ? workspacePhone.replaceAll(" ", "") : null;
    workspaceLocation = workspaceLocation ? workspaceLocation.trim() : null;

    let toBeEdited = {};
    toBeEdited.workspaceName = workspaceName;
    toBeEdited.workspaceType = workspaceType;
    toBeEdited.workspacePhone = workspacePhone;
    toBeEdited.workspaceLocation = workspaceLocation;
    console.log(workspaceName);
    const potentialErr = validateAttributes(
      workspaceName,
      workspaceType,
      workspacePhone
    );
    if (potentialErr) {
      return next(potentialErr);
    }

    const updatedWorkspace = await editWorkspaceDb(workspaceId, toBeEdited); //included [1,1,1,1] means all included

    if (!updatedWorkspace)
      return next(
        new AppError("there is no such a workspace with that id", 400)
      );

    res.status(200).json({
      status: "success",
      data: {
        updatedWorkspace,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export { createWorkspace, editWorkspace };