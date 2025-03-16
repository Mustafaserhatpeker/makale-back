import File from "../models/File.js";

export const saveFile = async (filePath, uploadedBy) => {
  const file = new File({ filePath, uploadedBy });
  await file.save();
  return file;
};

export const getFileById = async (id) => {
  return await File.findById(id);
};

export const getFiles = async () => {
  return await File.find();
};
