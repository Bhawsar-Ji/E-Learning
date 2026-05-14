import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, UpdateProfile, getDashboard, saveResult, getExamResult } from "../controllers/userController.js"
import upload from "../middlewares/multer.js"

let userRouter = express.Router()

userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.get("/dashboard",isAuth,getDashboard)
userRouter.post("/updateprofile",isAuth,upload.single("photoUrl"),UpdateProfile)
userRouter.post("/save-result", isAuth, saveResult);
userRouter.get("/exam-result/:courseId", isAuth, getExamResult);

export default userRouter