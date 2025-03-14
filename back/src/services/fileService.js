import File from "../models/File.js";

export const saveFile = async (filePath, uploadedBy, uploadedFor) => {
  const file = new File({ filePath, uploadedBy, uploadedFor });
  await file.save();
  return file;
};
