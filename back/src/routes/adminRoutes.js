import express from "express";
import {
  loginAdmin,
  registerUser,
  listUsers,
} from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add-user", adminMiddleware, registerUser);
router.get("/list-users", adminMiddleware, listUsers);

export default router;
