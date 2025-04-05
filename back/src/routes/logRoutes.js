import express from "express";
import { getAllLogsController, getLogsByStateController, getLogsByTypeController } from "../controllers/logController.js";
const router = express.Router();

router.get("/get-all-logs", getAllLogsController);
router.post("/get-logs-by-type", getLogsByTypeController);
router.post("/get-logs-by-state", getLogsByStateController);
export default router;