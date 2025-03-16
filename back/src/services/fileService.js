import File from "../models/File.js";
import mongoose from "mongoose";
export const saveFile = async (filePath, uploadedBy) => {
  const file = new File({ filePath, uploadedBy });
  await file.save();
  return file;
};

export const getFileById = async (id) => {
  try {
    id = id.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId.");
      return null;
    }

    console.log("id", id);
    const file = await File.findById(id);

    if (!file) {
      console.log("Dosya Bulunamadı.");
      return null;
    }

    console.log("file", file);
    return file;
  } catch (error) {
    console.error("Error fetching file:", error);
    return null;
  }
};

export const getFiles = async () => {
  return await File.find();
};
