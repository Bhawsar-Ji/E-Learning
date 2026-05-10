import mongoose from "mongoose";

const aiProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    aiCourseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AiCourse",
      required: true,
    },

    completedSections: {
      type: [Number],
      default: [],
    },

    progressPercentage: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AiProgress", aiProgressSchema);