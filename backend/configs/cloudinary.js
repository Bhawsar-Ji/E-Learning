import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const ext = path.extname(filePath).toLowerCase();

    const rawTypes = [
      ".pdf",
      ".doc",
      ".docx",
      ".ppt",
      ".pptx",
      ".xls",
      ".xlsx",
    ];

    const isRawFile = rawTypes.includes(ext);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: isRawFile ? "raw" : "auto",
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return isRawFile
      ? uploadResult.secure_url.replace(
          "/raw/upload/",
          "/raw/upload/fl_attachment/"
        )
      : uploadResult.secure_url;
  } catch (error) {
    console.log("CLOUDINARY ERROR:", error);

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

export default uploadOnCloudinary;