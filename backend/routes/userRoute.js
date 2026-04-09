import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurrentUser, UpdateProfile, getDashboard } from "../controllers/userController.js"
import upload from "../middlewares/multer.js"

let userRouter = express.Router()

userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.get("/dashboard",isAuth,getDashboard)
userRouter.post("/updateprofile",isAuth,upload.single("photoUrl"),UpdateProfile)

export default userRouter