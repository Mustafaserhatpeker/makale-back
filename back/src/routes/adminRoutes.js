import express from "express";
import { loginAdmin, registerUser } from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add-user", adminMiddleware, registerUser);

export default router;
