import {
  saveFile,
  getFileById,
  getFiles,
  getFileContent,
  updateConvertStatus,
  updateFileStatus,
} from "../services/fileService.js";
import Log from "../models/Log.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      const log = new Log({
        logContent: "Dosya yüklenmedi.",
        logType: "error",
        logState: "Dosya İşlemi",
      });
      await log.save();
      return res.status(400).json({ error: "Dosya yüklenmedi." });

    }

    const { uploadedBy } = req.body;

    const file = await saveFile(req.file.path, uploadedBy);
    const log = new Log({
      logContent: `Dosya yüklendi: ${req.file.path}`,
      logType: "success",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.json({ message: "Dosya başarıyla yüklendi.", file });
  } catch (error) {
    const log = new Log({
      logContent: `Dosya yüklenirken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Dosya İşlemi",
    });
    await log.save();
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
        logState: "Dosya İşlemi",
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
        fileObject.statusText = "Dosya Hakem Ataması Bekliyor.";
        break;
      case 2:
        fileObject.statusText = "Dosya Hakem İncelemesinde.";
        break;
      case 3:
        fileObject.statusText = "Hakem İncelemesi Bitti. Onaylandı.";
        break;
      case 4:
        fileObject.statusText = "Dosya Hakem Tarafından Reddedildi. Revizyon İsteniyor.";
        break;
      default:
        fileObject.statusText = "Bilinmeyen bir hata oluştu.";
        break;
    }

    res.json({ file: fileObject });
  } catch (error) {
    const log = new Log({
      logContent: `Dosya alınırken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Dosya İşlemi",
    });
    await log.save();
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
          fileObject.statusText = "Dosya Hakem Ataması Bekliyor.";
          break;
        case 2:
          fileObject.statusText = "Dosya Hakem İncelemesinde.";
          break;
        case 3:
          fileObject.statusText = "Hakem İncelemesi Bitti.";
          break;
        case 4:
          fileObject.statusText = "Dosya Hakem Tarafından Reddedildi. Revizyon İsteniyor.";
          break;
        default:
          fileObject.statusText = "Bilinmeyen bir hata oluştu.";
          break;
      }

      return fileObject;
    });

    res.json({ files: filesWithStatus });
  } catch (error) {
    const log = new Log({
      logContent: `Tüm dosyalar alınırken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.status(500).json({ error: error.message });
  }
};

export const getFileContentController = async (req, res) => {
  try {
    const { filePath } = req.body;
    console.log("filePath", req.body);
    const content = await getFileContent(filePath);
    res.send(content);
  } catch (error) {
    const log = new Log({
      logContent: `Dosya içeriği alınırken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.status(500).json({ error: error.message });
  }
};

export const updateConvertStatusController = async (req, res) => {
  try {
    const { fileId, status } = req.body;
    await updateConvertStatus(fileId, status);
    const log = new Log({
      logContent: `Dönüşüm durumu güncellendi: ${fileId}, ${status}`,
      logType: "success",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.json({ message: "Dönüşüm durumu güncellendi." });
  } catch (error) {
    const log = new Log({
      logContent: `Dönüşüm durumu güncellenirken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Dosya İşlemi",
    });
    await log.save();
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
        logState: "Dosya İşlemi",
      });
      await log.save();
      return res.status(400).json({ error: "Eksik parametre." });
    }
    await updateFileStatus(fileId, status);
    const log = new Log({
      logContent: `Dosya durumu güncellendi: ${fileId}, ${status}`,
      logType: "success",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.json({ message: "Dosya durumu güncellendi." });
  } catch (error) {
    const log = new Log({
      logContent: `Dosya durumu güncellenirken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.status(500).json({ error: error.message });
  }
};
