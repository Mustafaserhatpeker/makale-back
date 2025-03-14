import express from "express";
import { uploadFile } from "../controllers/fileController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);

export default router;
