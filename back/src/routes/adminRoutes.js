import express from "express";
import {
  loginAdmin,
  registerUser,
  listUsers,
  addFileToUserController,
} from "../controllers/adminController.js";
import { adminMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add-user", registerUser);
router.get("/list-users", listUsers);
router.post("/add-file-to-jury", addFileToUserController);

export default router;
