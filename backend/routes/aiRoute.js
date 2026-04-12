import express from "express"
/*import { searchWithAi } from "../controllers/aiController.js"*/
import isAuth from "../middlewares/isAuth.js"
import { geminiGenerate } from "../controllers/generateCourseController.js"

let aiRouter = express.Router()

/*aiRouter.post("/search",searchWithAi)*/
aiRouter.post("/generate-ai",isAuth, geminiGenerate)

export default aiRouter