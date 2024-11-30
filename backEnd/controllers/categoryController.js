import { catchAsyncError } from "../utilities.js";
import { retrieveAllCategories } from "../databases/categoryDatabase.js";
const getAllCategories = async (req, res, next) => {
  const categories = await retrieveAllCategories();
  res.status(200).json({
    status: "success",
    ok: true,
    data: { categories },
  });
};

export { getAllCategories };
