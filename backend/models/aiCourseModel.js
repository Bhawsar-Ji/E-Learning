import mongoose from "mongoose";
const aiCourseSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true
    },
    title:{
        type:String,
        required:true
    },

    classLevel: String,
    courseLanguage: String,

    content:{
        type:mongoose.Schema.Types.Mixed,
        required: true
    }
}, {timestamps:true})

const aiCourseModel = mongoose.model("aiCourse", aiCourseSchema)
export default aiCourseModel