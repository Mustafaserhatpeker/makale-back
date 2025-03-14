import express from "express";
import { getProfile } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { login } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

export default router;
