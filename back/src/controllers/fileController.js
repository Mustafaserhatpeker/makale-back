import { saveFile, getFileById } from "../services/fileService.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Dosya yüklenmedi." });
    }

    const { uploadedBy } = req.body;

    const file = await saveFile(req.file.path, uploadedBy);
    res.json({ message: "Dosya başarıyla yüklendi.", file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFile = async (req, res) => {
  try {
    const { id } = req.body;
    const file = await getFileById(id);

    if (!file) {
      return res.status(404).json({ error: "Dosya bulunamadı." });
    }

    let fileObject = file.toObject(); // Mongoose nesnesini düz nesneye çevir

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
      default:
        fileObject.statusText = "Bilinmeyen bir hata oluştu.";
        break;
    }

    res.json({ file: fileObject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
