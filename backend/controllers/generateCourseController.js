import { buildPrompt } from "../configs/promptBuilder.js";
import aiCourseModel from "../models/aiCourseModel.js";
import userModel from "../models/userModel.js";
import { generateResponse } from "./aiController.js";

export const geminiGenerate = async (req, res) => {
  try {
    const { topic, language = "Hindi", level = "Beginner" } = req.body;
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User is not found" });
    }
    const aiPrompt = buildPrompt({
      topic,
      language,
      level,
    });

    const aiResponse = await generateResponse(aiPrompt);

    const aiCourse = await aiCourseModel.create({
      user: user._id,
      title: topic,
      classLevel: level,
      courseLanguage:language,
      content: aiResponse,
    });

    user.enrolledCourses.push(aiCourse._id);
    await user.save();
    return res.status(200).json({ data: aiResponse, aiCourseId: aiCourse._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Ai generation failed",
      message: error.message,
    });
  }
};
