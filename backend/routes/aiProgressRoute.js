import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { updateAiProgress, getAiProgress } from "../controllers/aiProgressController.js";

const router = express.Router();

router.post("/update", isAuth, updateAiProgress);
router.get("/:aiCourseId", isAuth, getAiProgress);

export default router;