import File from "../models/File.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import Log from "../models/Log.js";
export const saveFile = async (filePath, uploadedBy) => {
  const file = new File({ filePath, uploadedBy });
  const log = new Log({
    logContent: `Dosya başarıyla yüklendi: ${filePath}`,
    logType: "success",
    logState: "Dosya İşlemleri",
  });
  await log.save();
  await file.save();
  return file;
};

export const getFileById = async (id, uploadedBy) => {
  try {
    id = id.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const log = new Log({
        logContent: "Geçersiz ObjectId.",
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      console.log("Invalid ObjectId.");
      return null;
    }

    console.log("id", id);
    const file = await File.findById(id);

    if (!file) {
      console.log("Dosya Bulunamadı.");
      const log = new Log({
        logContent: "Dosya bulunamadı.",
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return null;
    }
    console.log("file", file);
    console.log("file.uploadedBy", file.uploadedBy);

    if (file.uploadedBy !== uploadedBy) {
      console.log("Dosya sahibi ile eşleşmiyor.");
      const log = new Log({
        logContent: "Dosya sahibi ile eşleşmiyor.",
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return null;
    }

    const log = new Log({
      logContent: `Dosya başarıyla getirildi: ${file.filePath}`,
      logType: "success",
      logState: "Dosya İşlemleri",
    });
    await log.save();
    return file;
  } catch (error) {
    console.error("Error fetching file:", error);
    const log = new Log({
      logContent: "Dosya getirilirken bir hata oluştu.",
      logType: "error",
      logState: "Dosya İşlemleri",
    });
    await log.save();
    return null;
  }
};

export const getFiles = async () => {
  const files = await File.find();
  if (!files || files.length === 0) {
    const log = new Log({
      logContent: "Dosya listesi boş.",
      logType: "info",
      logState: "Dosya İşlemleri",
    });
    await log.save();
  }
  const log = new Log({
    logContent: `Dosya Listesi: ${files.map((file) => file.filePath).join(", ")}`,
    logType: "success",
    logState: "Dosya İşlemleri",
  });
  await log.save();
  return files;
};

export const getFileContent = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const log = new Log({
      logContent: `Dosya başarıyla okundu: ${filePath}`,
      logType: "success",
      logState: "Dosya İşlemleri",
    });
    await log.save();
    console.log("Dosya başarıyla okundu:", data);
    return data;
  } catch (error) {
    const log = new Log({
      logContent: "Dosya okunamadı.",
      logType: "error",
      logState: "Dosya İşlemleri",
    });
    await log.save();
    console.error("Error reading file:", error);
    throw new Error("Dosya okunamadı");
  }
};

export const updateConvertStatus = async (fileId, status) => {
  try {
    const log = new Log({
      logContent: `Dönüşüm durumu güncellendi: ${fileId}, ${status}`,
      logType: "success",
      logState: "Dosya İşlemleri",
    })
    await log.save();
    await File.updateOne({ _id: fileId }, { isConverted: status });

  } catch (error) {
    const log = new Log({
      logContent: "Dosya durumu güncellenemedi.",
      logType: "error",
      logState: "Dosya İşlemleri",
    });
    await log.save();
    console.error("Error updating file converting:", error);
    throw new Error("Dosya durumu güncellenemedi.");
  }
};

export const updateFileStatus = async (fileId, status) => {
  try {
    await File.updateOne({ _id: fileId }, { fileStatus: status });
    const log = new Log({
      logContent: `Dosya durumu güncellendi: ${fileId}, ${status}`,
      logType: "success",
      logState: "Dosya İşlemleri",
    });
    await log.save();
  } catch (error) {
    const log = new Log({
      logContent: "Dosya durumu güncellenemedi.",
      logType: "error",
      logState: "Dosya İşlemleri",
    });
    await log.save();
    console.error("Error updating file status:", error);
    throw new Error("Dosya durumu güncellenemedi.");
  }
};
