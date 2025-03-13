import { adminLogin } from "../services/adminService.js";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { admin, token } = await adminLogin(username, password);
    res.json({ message: "Login successful", admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
