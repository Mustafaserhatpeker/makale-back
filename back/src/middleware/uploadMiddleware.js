import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// __dirname yerine geçecek kod
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.resolve(__dirname, "../uploads");

// uploads klasörü yoksa oluştur
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5MB dosya boyutu
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|txt|pdf/;
    const mimeTypes = [
      "image/jpeg",
      "image/png",
      "text/plain",
      "application/pdf",
    ];

    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = mimeTypes.includes(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      return cb(
        new Error("Sadece JPEG, JPG, PNG dosyaları yükleyebilirsiniz!")
      );
    }
  },
});

export default upload;
