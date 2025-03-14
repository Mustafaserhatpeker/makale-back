import multer from "multer";
import path from "path";

// Dosyaları "uploads/" klasörüne kaydetmek için multer yapılandırması
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Dosya nereye kaydedilecek
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Dosya ismi
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum 5MB dosya
  fileFilter: function (req, file, cb) {
    // Sadece resim dosyalarına izin ver
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

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
