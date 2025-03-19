import express from "express";
import { addMessage, getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send-message", addMessage);
router.get("/get-messages", getMessages);

export default router;
