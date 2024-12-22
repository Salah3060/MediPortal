import express from "express";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import { getStats } from "../controllers/statsController.js";
import { deleteFromCloud } from "../utilities.js";

const router = express.Router();

router.get("/delete", (req, res, next) => {
  try {
    const url =
      "https://res.cloudinary.com/dgljetjdr/image/upload/v1734871307/wdhbqrgnhpj4ush4gxyl.png";
    console.log(deleteFromCloud(url));
    res.end("hi");
  } catch (error) {
    console.log(error);
  }
});
router.use(validateLoggedIn);

router.get("/", getStats);

export default router;
