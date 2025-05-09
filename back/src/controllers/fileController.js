import {
  saveFile,
  getFileById,
  getFiles,
  getFileContent,
  updateConvertStatus,
  updateFileStatus,
} from "../services/fileService.js";
import Log from "../models/Log.js";
import path from "path";
import fs from 'fs/promises';
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      const log = new Log({
        logContent: "Dosya yüklenmedi.",
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return res.status(400).json({ error: "Dosya yüklenmedi." });

    }

    const { uploadedBy } = req.body;
    if (!uploadedBy) {
      const log = new Log({
        logContent: "Dosya yüklenirken hata oluştu: Eksik parametre.",
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return res.status(400).json({ error: "Eksik parametre." });
    }
    const file = await saveFile(req.file.path, uploadedBy);


    res.json({ message: "Dosya başarıyla yüklendi.", file });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const { id, uploadedBy } = req.body;
    const file = await getFileById(id, uploadedBy);

    if (!file) {
      const log = new Log({
        logContent: `Dosya bulunamadı: ${id}`,
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return res.status(404).json({ error: "Dosya bulunamadı." });
    }

    let fileObject = file.toObject();
    if (fileObject.isConverted === true) {
      const lastSlashIndex = fileObject.filePath.lastIndexOf("/");
      if (lastSlashIndex !== -1) {
        fileObject.convertedFilePath =
          fileObject.filePath.slice(0, lastSlashIndex + 1) +
          "tamamlandi-" +
          fileObject.filePath.slice(lastSlashIndex + 1);
      } else {
        fileObject.convertedFilePath = "tamamlandi-" + fileObject.filePath;
      }
    }

    switch (fileObject.fileStatus) {
      case 0:
        fileObject.statusText = "Dosya Editöre Gönderildi.";
        break;
      case 1:
        fileObject.statusText = "Dosya İşleme Alınmayı Bekliyor.";
        break;
      case 2:
        fileObject.statusText = "Editör İşlemleri Tamamlandı. Hakem Ataması Bekleniyor.";
        break;
      case 3:
        fileObject.statusText = "Dosya Editör Tarafından Reddedildi. Revizyon İsteniyor.";
        break;
      case 4:
        fileObject.statusText = "Dosya Hakeme Atandı.";
        break;
      case 5:
        fileObject.statusText = "Dosya Hakem İncelemesi Bekliyor.";
        break;
      case 6:
        fileObject.statusText = "Dosya Hakem İncelemesinde.";
        break;
      case 7:
        fileObject.statusText = "Hakem İncelemesi Sona Erdi. Hakem Sonucu Bekleniyor.";
        break;
      case 8:
        fileObject.statusText = "Dosya Reddedildi.";
        break;
      case 9:
        fileObject.statusText = "Dosya Onaylandı.";
        break;
      default:
        fileObject.statusText = "Bilinmeyen bir hata oluştu.";
        break;
    }


    res.json({ file: fileObject });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};
export const getAllFiles = async (req, res) => {
  try {
    const files = await getFiles();
    const filesWithStatus = files.map((file) => {
      let fileObject = file.toObject();
      if (fileObject.isConverted === true) {
        const lastSlashIndex = fileObject.filePath.lastIndexOf("/");
        if (lastSlashIndex !== -1) {
          fileObject.convertedFilePath =
            fileObject.filePath.slice(0, lastSlashIndex + 1) +
            "tamamlandi-" +
            fileObject.filePath.slice(lastSlashIndex + 1);
        } else {

          fileObject.convertedFilePath = "tamamlandi-" + fileObject.filePath;
        }
      }
      switch (fileObject.fileStatus) {
        case 0:
          fileObject.statusText = "Dosya Editöre Gönderildi.";
          break;
        case 1:
          fileObject.statusText = "Dosya İşleme Alınmayı Bekliyor.";
          break;
        case 2:
          fileObject.statusText = "Editör İşlemleri Tamamlandı. Hakem Ataması Bekleniyor.";
          break;
        case 3:
          fileObject.statusText = "Dosya Editör Tarafından Reddedildi. Revizyon İsteniyor.";
          break;
        case 4:
          fileObject.statusText = "Dosya Hakeme Atandı.";
          break;
        case 5:
          fileObject.statusText = "Dosya Hakem İncelemesi Bekliyor.";
          break;
        case 6:
          fileObject.statusText = "Dosya Hakem İncelemesinde.";
          break;
        case 7:
          fileObject.statusText = "Hakem İncelemesi Sona Erdi. Hakem Sonucu Bekleniyor.";
          break;
        case 8:
          fileObject.statusText = "Dosya Reddedildi.";
          break;
        case 9:
          fileObject.statusText = "Dosya Onaylandı.";
          break;
        default:
          fileObject.statusText = "Bilinmeyen bir hata oluştu.";
          break;
      }

      return fileObject;
    });

    res.json({ files: filesWithStatus });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};


export const getFileContentController = async (req, res) => {
  try {
    const { filePath } = req.body;
    if (!filePath) {
      return res.status(400).json({ error: "Eksik parametre." });
    }


    const fullFilePath = path.resolve(filePath);


    const content = await getFileContent(fullFilePath);


    res.setHeader("Content-Type", "application/pdf");
    res.send(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateConvertStatusController = async (req, res) => {
  try {
    const { fileId, status } = req.body;
    if (!fileId || !status) {
      const log = new Log({
        logContent: `Dönüşüm durumu güncellenirken eksik parametre: ${fileId}, ${status}`,
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return res.status(400).json({ error: "Eksik parametre." });
    }

    await updateConvertStatus(fileId, status);
    res.json({ message: "Dönüşüm durumu güncellendi." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFileStatusController = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { fileId, status } = req.body;
    if (!fileId || !status) {
      const log = new Log({
        logContent: `Dosya durumu güncellenirken eksik parametre: ${fileId}, ${status}`,
        logType: "error",
        logState: "Dosya İşlemleri",
      });
      await log.save();
      return res.status(400).json({ error: "Eksik parametre." });
    }
    await updateFileStatus(fileId, status);
    res.json({ message: "Dosya durumu güncellendi." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
