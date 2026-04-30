import express from "express"
import dotenv from "dotenv"
import connectDb from "./configs/db.js"
import authRouter from "./routes/authRoute.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/userRoute.js"
import courseRouter from "./routes/courseRoute.js"
import paymentRouter from "./routes/paymentRoute.js"
import aiRouter from "./routes/aiRoute.js"
import reviewRouter from "./routes/reviewRoute.js"
import progressRouter from "./routes/progressRoute.js"
dotenv.config()

let port = process.env.PORT || 8000
let app = express()
app.use(express.json())
app.use("/public", express.static("public"))
app.use(cookieParser())
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://e-learning-1-2qnu.onrender.com",
  "http://localhost:5173",
  "http://127.0.0.1:5173"
]
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}))
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/users", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/courses", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/ai", aiRouter)
app.use("/api/generate-ai", aiRouter)
app.use("/api/review", reviewRouter)
app.use("/api/reviews", reviewRouter)
app.use("/api/progress", progressRouter)

app.get("/" , (req,res)=>{
    res.send("Hello From Server")
})

app.listen(port , ()=>{
    console.log("Server Started")
    connectDb()
})

