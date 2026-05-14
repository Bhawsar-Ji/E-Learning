import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!filePath) return null;

    const ext = path.extname(filePath).toLowerCase();

    const rawTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx"];

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: rawTypes.includes(ext) ? "raw" : "auto",
    });

    fs.unlinkSync(filePath);

    return uploadResult.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.log(error);
    return null;
  }
};

export default uploadOnCloudinary;