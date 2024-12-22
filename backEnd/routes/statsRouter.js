import express from "express";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import { getStats } from "../controllers/statsController.js";
import { deleteFromCloud } from "../utilities.js";

const router = express.Router();

router.get("/delete", (req, res, next) => {
  try {
    const url =
      "https://res.cloudinary.com/dgljetjdr/image/upload/c_fill,f_auto,g_faces,h_200,q_auto,w_200/vy1ck4c9mizw5mvfsur7?_a=BAMCkGFD0";
    console.log(deleteFromCloud(url));
    res.end("hi");
  } catch (error) {
    console.log(error);
  }
});
router.use(validateLoggedIn);

router.get("/", getStats);

export default router;
