import express from "express";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Dosya yüklenemedi!" });
  }

  res.json({
    message: "Dosya başarıyla yüklendi!",
    fileUrl: `http://localhost:3001/uploads/${req.file.filename}`,
  });
});

export default router;
