import File from "../models/File.js";
import mongoose from "mongoose";
import fs from "fs/promises";
export const saveFile = async (filePath, uploadedBy) => {
  const file = new File({ filePath, uploadedBy });
  await file.save();
  return file;
};

export const getFileById = async (id, uploadedBy) => {
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
    console.log("file.uploadedBy", file.uploadedBy);

    if (file.uploadedBy !== uploadedBy) {
      console.log("Dosya sahibi ile eşleşmiyor.");
      return null;
    }
    console.log("Dosya sahibi ile eşleşiyor.");

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

export const getFileContent = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw new Error("Dosya okunamadı");
  }
};

export const updateConvertStatus = async (fileId, status) => {
  try {
    await File.updateOne({ _id: fileId }, { isConverted: status });
  } catch (error) {
    console.error("Error updating file converting:", error);
    throw new Error("Dosya durumu güncellenemedi.");
  }
};

export const updateFileStatus = async (fileId, status) => {
  try {
    await File.updateOne({ _id: fileId }, { fileStatus: status });
  } catch (error) {
    console.error("Error updating file status:", error);
    throw new Error("Dosya durumu güncellenemedi.");
  }
};
