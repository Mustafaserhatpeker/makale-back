import express from "express";
import { getLogsController } from "../controllers/logController.js";
const router = express.Router();


router.post("/get-logs", getLogsController);

export default router;