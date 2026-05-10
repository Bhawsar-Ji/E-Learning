import AiProgress from "../models/aiProgressModel.js";
import aiCourse from "../models/aiCourseModel.js";

export const updateAiProgress = async (req, res) => {
  try {

    const { aiCourseId, completedSection } = req.body;

    const course = await aiCourse.findById(aiCourseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let progress = await AiProgress.findOne({
      userId: req.userId,
      aiCourseId,
    });

    if (!progress) {
      progress = await AiProgress.create({
        userId: req.userId,
        aiCourseId,
        completedSections: [],
      });
    }

    if (!progress.completedSections.includes(completedSection)) {
      progress.completedSections.push(completedSection);
    }

    progress.progressPercentage = Math.round(
      (progress.completedSections.length / course.content.sections.length) * 100
    );

    await progress.save();

    res.status(200).json({
      success: true,
      progress,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAiProgress = async (req, res) => {

  try {

    const { aiCourseId } = req.params;

    const progress = await AiProgress.findOne({
      userId: req.userId,
      aiCourseId,
    });

    if (!progress) {

      return res.status(200).json({
        completedSections: [],
      });

    }

    res.status(200).json(progress);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};