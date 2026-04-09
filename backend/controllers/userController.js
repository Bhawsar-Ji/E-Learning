import uploadOnCloudinary from "../configs/cloudinary.js";
import User from "../models/userModel.js";

export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")
         if(!user){
            return res.status(400).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"get current user error"})
    }
}

export const getDashboard = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
            .populate({
                path: "enrolledCourses",
                populate: [
                    { path: "creator", select: "name" },
                    { path: "lectures", select: "lectureTitle" }
                ]
            });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const enrolledCourses = (user.enrolledCourses || []).map((course) => ({
            courseId: course._id,
            title: course.title,
            thumbnail: course.thumbnail,
            instructor: course.creator?.name || "Unknown Instructor",
            progress: 0
        }));

        const lastCourse = enrolledCourses.length > 0 ? user.enrolledCourses[user.enrolledCourses.length - 1] : null;
        const continueLearning = lastCourse
            ? {
                courseId: lastCourse._id,
                courseTitle: lastCourse.title,
                courseThumbnail: lastCourse.thumbnail,
                lessonId: lastCourse.lectures?.[0]?._id || null,
                lessonTitle: lastCourse.lectures?.[0]?.lectureTitle || "Start learning"
            }
            : {};

        return res.status(200).json({
            enrolledCourses,
            continueLearning,
            recentLessons: []
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Dashboard fetch error" });
    }
};

export const UpdateProfile = async (req,res) => {
    try {
        const userId = req.userId
        const {name , description} = req.body
        let photoUrl
        if(req.file){
           photoUrl =await uploadOnCloudinary(req.file.path)
        }
        const user = await User.findByIdAndUpdate(userId,{name,description,photoUrl})


        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
         console.log(error);
       return res.status(500).json({message:`Update Profile Error  ${error}`})
    }
}
