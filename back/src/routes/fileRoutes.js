import express from "express";
import {
  uploadFile,
  getFile,
  getAllFiles,
  getFileContentController,
} from "../controllers/fileController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/getfile", getFile);
router.get("/get-all-files", getAllFiles);
router.post("/get-file-content", getFileContentController);
export default router;
