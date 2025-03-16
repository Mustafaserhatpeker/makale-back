import express from "express";
import {
  uploadFile,
  getFile,
  getAllFiles,
} from "../controllers/fileController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/getfile", getFile);
router.get("/get-all-files", getAllFiles);

export default router;
