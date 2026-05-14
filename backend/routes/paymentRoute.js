import express from "express"
import { createOrder, verifyPayment, createCreditOrder, verifyCreditPayment, } from "../controllers/orderController.js";
import isAuth from "../middlewares/isAuth.js";


let paymentRouter = express.Router()

paymentRouter.post("/create-order", isAuth, createOrder);
paymentRouter.post("/verify-payment", isAuth, verifyPayment);
paymentRouter.post("/create-credit-order",isAuth, createCreditOrder);
paymentRouter.post("/verify-credit-payment",isAuth, verifyCreditPayment);


export default paymentRouter