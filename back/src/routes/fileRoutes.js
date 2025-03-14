import express from "express";
import { uploadFile } from "../controllers/fileController.js";
import upload from "../middleware/uploadMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", authMiddleware, upload.single("file"), uploadFile);

export default router;
