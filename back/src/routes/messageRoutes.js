import { addMessageController } from "../controllers/messageController.js";
import express from "express";
const router = express.Router();

router.post("/add-message", addMessageController);

export default router;
