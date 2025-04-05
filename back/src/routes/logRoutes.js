import express from "express";
import { getLogsController } from "../controllers/logController.js";
const router = express.Router();


router.post("/", getLogsController);

export default router;