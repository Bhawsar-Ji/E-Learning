import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    description: {
      type: String,
    },
    role: {
      type: String,
      enum: ["educator", "student"],
      required: true,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    resetOtp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isOtpVerifed: {
      type: Boolean,
      default: false,
    },
    examResults: [
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "aiCourse",
    },
    score: Number,
    totalQuestions: Number,
    percentage: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
],
    credits: {
      type: Number,
      default: 20,
    },

    transactions: [
      {
        type: {
          type: String,
          enum: ["earned", "spent", "purchased"],
        },

        amount: Number,

        description: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
