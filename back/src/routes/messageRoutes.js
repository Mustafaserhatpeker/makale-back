import express from "express";
import { addMessage, getMessagesByFileIdController, getAllMessagesController } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send-message", addMessage);
router.post("/get-messages", getMessagesByFileIdController);
router.get("/get-all-messages", getAllMessagesController);

export default router;
