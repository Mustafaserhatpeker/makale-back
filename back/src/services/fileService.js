import File from "../models/File.js";
import mongoose from "mongoose";
import fs from "fs/promises";
import Log from "../models/Log.js";
import path from "path";
export const saveFile = async (filePath, uploadedBy) => {
  const file = new File({ filePath, uploadedBy });
  const log = new Log({
    logContent: `Dosya başarıyla yüklendi: ${uploadedBy}`,
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
    console.log("id", id);
    console.log("uploadedBy dolu mu", uploadedBy);
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
  return files;
};

export const getFileContent = async (filePath) => {
  try {

    try {
      await fs.access(filePath);
    } catch (error) {
      throw new Error('Dosya mevcut değil');
    }


    const data = await fs.readFile(filePath);
    return data;
  } catch (error) {
    console.error("Dosya okunamadı:", error);
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
    const file = await File.findById(fileId);
    if (!file) {
      throw new Error("Dosya bulunamadı");
    }
    if (file.fileStatus === status) {
      const log = new Log({
        logContent: `Dosya zaten ${status} durumunda. Durum değişikliği yapılmadı: ${fileId}`,
        logType: "info",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return;
    }
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

