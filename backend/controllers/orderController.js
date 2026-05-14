import Course from "../models/courseModel.js";
import razorpay from "razorpay";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `${courseId}_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Order creation failed ${err}` });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, courseId, userId } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const user = await User.findById(userId);

      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }

      const course = await Course.findById(courseId).populate("lectures");

      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }

      return res.status(200).json({
        message: "Payment verified and enrollment successful",
      });
    } else {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error during payment verification",
    });
  }
};

// CREDIT ORDER CREATE
export const createCreditOrder = async (req, res) => {
  try {
    const { credits, amount } = req.body;

    if (!credits || !amount) {
      return res.status(400).json({
        message: "Credits and amount are required",
      });
    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: `credits_${credits}_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Credit order creation failed",
    });
  }
};

// CREDIT PAYMENT VERIFY
export const verifyCreditPayment = async (req, res) => {
  try {
    console.log("VERIFY BODY:", req.body);

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const credits = req.body?.credits;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !credits
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    const userId = req.userId || req.user?._id || req.body?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.credits = (user.credits || 0) + Number(credits);
    user.transactions.push({
      type: "purchased",
      amount: Number(credits),
      description: `${credits} credits purchased successfully`,
    });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Credits added successfully",
      credits: user.credits,
    });
  } catch (error) {
    console.log("VERIFY CREDIT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Credit payment verification failed",
    });
  }
};
