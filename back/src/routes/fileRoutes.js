import express from "express";
import { uploadFile, getFile } from "../controllers/fileController.js";
import upload from "../middleware/uploadMiddleware.js";
import { get } from "mongoose";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/getfile", getFile);

export default router;
