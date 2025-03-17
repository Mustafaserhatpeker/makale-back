import express from "express";
import {
  uploadFile,
  getFile,
  getAllFiles,
  getFileContentController,
  updateConvertStatusController,
  updateFileStatusController,
} from "../controllers/fileController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/getfile", getFile);
router.get("/get-all-files", getAllFiles);
router.post("/get-file-content", getFileContentController);
router.post("/update-convert-status", updateConvertStatusController);
router.post("/update-file-status", updateFileStatusController);
export default router;
