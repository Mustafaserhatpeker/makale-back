import express from "express";
import { loginAdmin, registerUser } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/add-user", registerUser);

export default router;
