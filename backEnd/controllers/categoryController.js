import { catchAsyncError, formatString } from "../utilities.js";
import {
  retrieveAllCategories,
  createCategoryDb,
  updateCategory,
} from "../databases/categoryDatabase.js";
const getAllCategories = async (req, res, next) => {
  const categories = await retrieveAllCategories();
  res.status(200).json({
    status: "success",
    ok: true,
    data: { categories },
  });
};
const createCategory = catchAsyncError(async (req, res, next) => {
  let { categoryName, categoryDescription } = req.body;
  if (!categoryName || !categoryDescription)
    return next(new AppError("Missing data", 400));
  categoryName = formatString(categoryName);
  categoryDescription = categoryDescription.trim();
  const attributes = [categoryName, categoryDescription];

  const category = await createCategoryDb(attributes);
  if (category.status === "fail" || category.severity === "ERROR") {
    return next(new AppError(category.message || "something went wrong"));
  }
  res.status(200).json({
    status: "successful",
    data: {
      category,
    },
  });
});

const editCategory = catchAsyncError(async (req, res, next) => {
  let { categoryName, categoryDescription } = req.body;
  const categoryId = req.params.id;
  let categoryImg = null;
  if (req.imgurl) {
    //checking if there is an existing photo to delete it

    //uploading the new img
    categoryImg = req.imgurl;
  }
  categoryName = categoryName ? formatString(categoryName) : null;
  categoryDescription = categoryDescription ? categoryDescription.trim() : null;
  let toBeEdited = {};
  toBeEdited.categoryName = categoryName;
  toBeEdited.categoryDescription = categoryDescription;
  toBeEdited.categoryImg = categoryImg;

  if (!Object.values(toBeEdited).filter((v) => v).length)
    return next(new AppError("Specify at least one attribute to update"));

  const updatedCategory = await updateCategory(toBeEdited, categoryId);
  if (
    updatedCategory.status === "fail" ||
    updatedCategory.severity === "ERROR"
  ) {
    return next(
      new AppError(updatedCategory.message || "something went wrong")
    );
  }
  res.status(200).json({
    status: "successful",
    data: {
      updatedCategory,
    },
  });
});
export { getAllCategories, createCategory, editCategory };
