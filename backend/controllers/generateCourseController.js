import { buildPrompt } from "../configs/promptBuilder.js";
import aiCourseModel from "../models/aiCourseModel.js";
import userModel from "../models/userModel.js";
import { generateResponse } from "./aiController.js";

export const geminiGenerate = async (req, res) => {
  try {
    const { topic, language = "Hindi", level = "Beginner" } = req.body;

    const CREDIT_COST_BY_LEVEL = {
      Beginner: 5,
      Intermediate: 8,
      Advanced: 10,
    };

    const COURSE_GENERATION_COST =
      CREDIT_COST_BY_LEVEL[level] || 5;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required",
      });
    }

    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(400).json({
        message: "User is not found",
      });
    }

    if (user.credits < COURSE_GENERATION_COST) {
      return res.status(400).json({
        message: "Not enough credits",
      });
    }

    const aiPrompt = buildPrompt({
      topic,
      language,
      level,
    });

    const aiResponse = await generateResponse(aiPrompt);

    const { quiz, ...courseData } = aiResponse;

    const aiCourse = await aiCourseModel.create({
      user: user._id,
      title: topic,
      classLevel: level,
      courseLanguage: language,
      content: courseData,
      quiz: quiz,
    });

    user.enrolledCourses.push(aiCourse._id);

    user.credits -= COURSE_GENERATION_COST;

    user.transactions.push({
      type: "spent",
      amount: COURSE_GENERATION_COST,
      description: `Generated ${level} AI course: ${topic}`,
    });

    await user.save();

    return res.status(200).json({
      data: courseData,
      quiz,
      aiCourseId: aiCourse._id,
      remainingCredits: user.credits,
      message: "Course generated successfully",
    });
  } catch (error) {
    console.log("AI GENERATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "AI generation failed",
    });
  }
};
