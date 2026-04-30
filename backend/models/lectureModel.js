import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureTitle:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String
    },
    isPreviewFree:{
        type:Boolean
    },
    youtubeLink:{
        type: String,
        required: false, // Optional to maintain backward compatibility
        validate: {
          validator: function (v) {
            return /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(v);
          },
          message: props => `${props.value} is not a valid YouTube URL!`
        }
    },
    files: [
      {
        url: String,
        name: String
      }
    ]
},{timestamps:true})


const Lecture = mongoose.model("Lecture" , lectureSchema)

export default Lecture