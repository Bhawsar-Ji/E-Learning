import uploadOnCloudinary from "../configs/cloudinary.js";
import User from "../models/userModel.js";
import Progress from "../models/progressModel.js";
import AiCourseProgress from "../models/aiProgressModel.js";
import AiProgress from "../models/aiProgressModel.js";
import aiCourseModel from "../models/aiCourseModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(400).json({ message: "user does not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "get current user error" });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: "enrolledCourses",
      populate: [
        { path: "creator", select: "name" },
        { path: "lectures", select: "lectureTitle" },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const courseIds = (user.enrolledCourses || []).map((course) => course._id);
    const progressRecords = await Progress.find({
      userId: req.userId,
      courseId: { $in: courseIds },
    });

    const progressMap = progressRecords.reduce((map, progress) => {
      map[progress.courseId.toString()] = progress;
      return map;
    }, {});

    const enrolledCourses = (user.enrolledCourses || []).map((course) => ({
      courseId: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      instructor: course.creator?.name || "Unknown Instructor",
      progress: progressMap[course._id.toString()]?.progressPercentage || 0,
    }));
    const aiCourses = await aiCourseModel
  .find({ user: req.userId })
  .select("title createdAt")
  .lean();

    const aiProgressRecords = await AiProgress.find({
      userId: req.userId,
    });

    const aiProgressMap = aiProgressRecords.reduce((map, item) => {
      map[item.aiCourseId.toString()] = item;
      return map;
    }, {});

    const formattedAiCourses = aiCourses.map((course) => ({
      courseId: course._id,
      title: course.title,
      thumbnail:
        "https://res.cloudinary.com/dkhbhumqj/image/upload/v1778415316/ChatGPT_Image_May_10_2026_05_44_09_PM_o7wacq.png?q=80&w=1200&auto=format&fit=crop",
      instructor: "AI Generated Course",
      progress: aiProgressMap[course._id.toString()]?.progressPercentage || 0,
      isAiCourse: true,
      content: course.content,
    }));

    const lastAiCourse =
    aiCourses.length > 0
        ? aiCourses[aiCourses.length - 1]
        : null;

const lastAiProgress =
    lastAiCourse
        ? aiProgressMap[lastAiCourse._id.toString()]
        : null;

const continueLearningAi = lastAiCourse
    ? {
          courseId: lastAiCourse._id,
          courseTitle: lastAiCourse.title,
          courseThumbnail:
              "https://res.cloudinary.com/dkhbhumqj/image/upload/v1778415316/ChatGPT_Image_May_10_2026_05_44_09_PM_o7wacq.png?q=80",
          lessonTitle: `Progress ${lastAiProgress?.progressPercentage || 0}%`,
          isAiCourse: true,
          content: lastAiCourse.content,
          progress: lastAiProgress?.progressPercentage || 0,
      }
    : null;

    const lastCourse =
      user.enrolledCourses.length > 0
        ? user.enrolledCourses[user.enrolledCourses.length - 1]
        : null;
    const lastProgress = lastCourse
      ? progressMap[lastCourse._id.toString()]
      : null;
    const watchedLessonId =
      lastProgress?.lastWatchedLesson || lastCourse?.lectures?.[0]?._id || null;
    const watchedLesson = lastCourse?.lectures?.find(
      (lecture) => lecture._id.toString() === watchedLessonId?.toString(),
    );

    const continueLearning = continueLearningAi
    ? continueLearningAi
    : lastCourse
    ? {
          courseId: lastCourse._id,
          courseTitle: lastCourse.title,
          courseThumbnail: lastCourse.thumbnail,
          lessonId: watchedLessonId,
          lessonTitle: watchedLesson?.lectureTitle || "Start learning",
          progress: lastProgress?.progressPercentage || 0,
      }
    : {};

    return res.status(200).json({
      enrolledCourses: [...enrolledCourses, ...formattedAiCourses],
      continueLearning,
      recentLessons: [],
      credits: user.credits || 0,
      transactions: (user.transactions || []).slice(-10).reverse(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Dashboard fetch error" });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description } = req.body;
    let photoUrl;
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }
    const user = await User.findByIdAndUpdate(userId, {
      name,
      description,
      photoUrl,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Update Profile Error  ${error}` });
  }
};

export const saveResult = async (req, res) => {
  try {
    const { courseId, score, totalQuestions, percentage } = req.body;

    const user = await User.findById(req.userId);

    const existingResult = user.examResults.find(
      (item) => item.courseId.toString() === courseId
    );

    if (existingResult) {
      return res.status(200).json({
        success: true,
        result: existingResult,
        message: "Result already exists",
      });
    }

    user.examResults.push({
      courseId,
      score,
      totalQuestions,
      percentage,
    });

    await user.save();

    res.status(200).json({
      success: true,
      result: user.examResults[user.examResults.length - 1],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Result save failed" });
  }
};

export const getExamResult = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const result = user.examResults.find(
      (item) => item.courseId.toString() === req.params.courseId
    );

    if (!result) {
      return res.status(404).json({ success: false, message: "No result found" });
    }

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Result fetch failed" });
  }
};