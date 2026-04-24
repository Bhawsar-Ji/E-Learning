import Progress from "../models/progressModel.js";
import Course from "../models/courseModel.js";

const calculatePercentage = (completedLessons, totalLectures) => {
  if (!totalLectures || totalLectures === 0) return 0;
  const uniqueCount = [...new Set(completedLessons.map((id) => id.toString()))].length;
  return Math.min(100, Math.round((uniqueCount / totalLectures) * 100));
};

export const getProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      userId: req.userId,
      courseId,
    });

    if (!progress) {
      return res.status(200).json({
        courseId,
        completedLessons: [],
        lastWatchedLesson: null,
        progressPercentage: 0,
        updatedAt: null,
      });
    }

    return res.status(200).json({
      courseId: progress.courseId,
      completedLessons: progress.completedLessons,
      lastWatchedLesson: progress.lastWatchedLesson,
      progressPercentage: progress.progressPercentage,
      updatedAt: progress.updatedAt,
    });
  } catch (error) {
    console.error("Get progress error", error);
    return res.status(500).json({ message: "Unable to fetch course progress" });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId, progressPercentage, completedLessons } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "courseId is required" });
    }

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updateFields = {
      lastWatchedLesson: lessonId || undefined,
    };
    if (typeof progressPercentage === "number") {
      updateFields.progressPercentage = Math.min(100, Math.max(0, progressPercentage));
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId, courseId },
      {
        $set: updateFields,
        $addToSet: {
          completedLessons: { $each: completedLessons || [] },
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    if (!progressPercentage && lessonId && course.lectures?.length > 0) {
      const lectureIndex = course.lectures.findIndex(
        (lecture) => lecture._id.toString() === lessonId.toString()
      );
      const derivedProgress = Math.round(
        ((lectureIndex + 1) / course.lectures.length) * 100
      );
      progress.progressPercentage = Math.max(progress.progressPercentage, derivedProgress);
      await progress.save();
    }

    const totalLectures = course.lectures?.length || 0;
    progress.progressPercentage = calculatePercentage(
      progress.completedLessons,
      totalLectures
    );
    progress.lastWatchedLesson = lessonId || progress.lastWatchedLesson;
    await progress.save();

    return res.status(200).json(progress);
  } catch (error) {
    console.error("Update progress error", error);
    return res.status(500).json({ message: "Unable to update progress" });
  }
};

export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    if (!courseId || !lessonId) {
      return res.status(400).json({ message: "courseId and lessonId are required" });
    }

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: req.userId, courseId },
      {
        $addToSet: { completedLessons: lessonId },
        $set: { lastWatchedLesson: lessonId },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const totalLectures = course.lectures?.length || 0;
    progress.progressPercentage = calculatePercentage(
      progress.completedLessons,
      totalLectures
    );
    await progress.save();

    return res.status(200).json(progress);
  } catch (error) {
    console.error("Complete lesson error", error);
    return res.status(500).json({ message: "Unable to mark lesson complete" });
  }
};
