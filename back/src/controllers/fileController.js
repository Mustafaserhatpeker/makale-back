import { saveFile } from "../services/fileService.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Dosya yüklenmedi." });
    }

    const { uploadedFor, uploadedBy } = req.body;

    const file = await saveFile(req.file.path, uploadedBy, uploadedFor);
    res.json({ message: "Dosya başarıyla yüklendi.", file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
