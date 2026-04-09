import express from "express"
import isAuth from "../middlewares/isAuth.js"

let progressRouter = express.Router()

// Add progress-related routes here
// e.g., progressRouter.post("/track", isAuth, trackProgress)
// e.g., progressRouter.get("/mycourse/:courseId", isAuth, getProgress)

export default progressRouter
