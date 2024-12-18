import validator from "validator";
import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";
import {
  createWorkspaceDb,
  editWorkspaceDb,
  retrieveAllWorkSpaces,
  rerteieveAllLocations,
} from "../databases/workspaceDatabase.js";

const validAttributes = ["w.workSpaceId", "w.workspaceName", "w.workspaceType"];

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
    workspaceType = formatString(workspaceType);
    workspaceLocation = workspaceLocation.trim();
    workspacePhone = workspacePhone.replaceAll(" ", "");

    const potentialErr = validateAttributes(
      workspaceName,
      workspaceType,
      workspacePhone
    );
    if (potentialErr) {
      return next(potentialErr);
    }
    const workspace = await createWorkspaceDb(
      workspaceName,
      workspaceType,
      workspacePhone,
      workspaceLocation
    );
    console.log(workspace, 1111111);
    if (!workspace) {
      return next("something went wrong", 400);
    }
    if (workspace.status === "fail" || workspace.severity === "ERROR") {
      let message =
        workspace.code == "23505"
          ? "This workspace already exists"
          : "something wrong happened!";
      return next(new AppError(message));
    }

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
    const workspaceId = req.params.id; // {workspaceId , (contact or loc) , loc} -if third exist-
    const { secId } = req.params;
    const { thirdId } = req.params;
    if (!workspaceId) {
      return next(
        new AppError("An id must be provided to update an entity", 400)
      );
    }
    // preparation
    workspaceName = workspaceName ? workspaceName.trim() : null;
    workspaceType = workspaceType ? formatString(workspaceType) : null;
    workspacePhone = workspacePhone ? workspacePhone.replaceAll(" ", "") : null;
    workspaceLocation = workspaceLocation ? workspaceLocation.trim() : null;

    let toBeEdited = {};
    toBeEdited.workspaceName = workspaceName;
    toBeEdited.workspaceType = workspaceType;
    toBeEdited.workspacePhone = workspacePhone;
    toBeEdited.workspaceLocation = workspaceLocation;

    // handling passing correct number of attributes to be edited
    if (secId && !thirdId) {
      if (
        (workspacePhone && workspaceLocation) ||
        (!workspacePhone && !workspaceLocation)
      ) {
        return next(
          new AppError(
            "Please provide exactly one, either contact or location",
            400
          )
        );
      }
    }
    if (thirdId && thirdId) {
      if (!workspacePhone || !workspaceLocation) {
        return next(
          new AppError("Please provide both contact and location", 400)
        );
      }
    }
    //hadling passing correct number of ids
    if (workspacePhone && workspaceLocation) {
      if (secId && !thirdId) {
        return next(new AppError("Please provide correct ids to update", 400));
      }
    }
    if (workspacePhone || workspaceLocation) {
      if (!secId) {
        return next(new AppError("Please provide correct ids to update", 400));
      }
    }

    const potentialErr = validateAttributes(
      workspaceName,
      workspaceType,
      workspacePhone
    );
    if (potentialErr) {
      return next(potentialErr);
    }

    const updatedWorkspace = await editWorkspaceDb(
      workspaceId,
      secId,
      thirdId,
      toBeEdited
    );

    if (!updatedWorkspace)
      return next(
        new AppError("there is no such a workspace with that id", 400)
      );
    if (
      updatedWorkspace.status === "fail" ||
      updatedWorkspace.severity === "ERROR"
    ) {
      let message =
        updatedWorkspace.code == "23505"
          ? "This workspace already exists"
          : "something wrong happened!";
      return next(new AppError(message));
    }

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
const getAllWorkSpaces = catchAsyncError(async (req, res, next) => {
  let fields;
  if (req.query.fields) {
    fields = fieldsQueryHandler(req.query, validAttributes);
    if (!fields) return next(new AppError("Invalid query atrributes", 400));
    if (fields.length == 0) fields = undefined;
  }
  delete req.query.fields;

  let orders;

  if (req.query.order) {
    orders = orderQueryHandler(req.query, validAttributes);
    console.log(orders);
    if (!orders) return next(new AppError("Invalid query atrributes", 400));
    if (orders.length == 0) orders = undefined;
  }
  delete req.query.order;

  let limit = req.query.limit || 50;
  let page = req.query.page || 1;

  delete req.query.limit;
  delete req.query.page;

  let filters;
  if (req.query) {
    filters = filterQueryHandler(req.query, validAttributes);
    if (!filters) return next(new AppError("Invalid query atrributes", 400));
    if (filters.length == 0) filters = undefined;
  }
  const workSpaces = await retrieveAllWorkSpaces(
    fields,
    filters,
    orders,
    limit,
    page
  );
  res.status(200).json({
    status: "succes",
    ok: true,
    data: { workSpaces },
  });
});

const getAllLocations = catchAsyncError(async (req, res, next) => {
  const locations = await rerteieveAllLocations();
  res.status(200).json({
    status: "succes",
    ok: true,
    data: { locations },
  });
});

export { createWorkspace, editWorkspace, getAllWorkSpaces, getAllLocations };
