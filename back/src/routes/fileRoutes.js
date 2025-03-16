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
router.get("/getallfiles", getAllFiles);

export default router;
