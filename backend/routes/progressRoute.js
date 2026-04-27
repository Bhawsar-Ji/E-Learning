import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getProgress, updateProgress, completeLesson } from "../controllers/progressController.js"

let progressRouter = express.Router()

progressRouter.post("/update", isAuth, updateProgress)
progressRouter.patch("/lesson-complete", isAuth, completeLesson)
progressRouter.get("/:courseId", isAuth, getProgress)

export default progressRouter
