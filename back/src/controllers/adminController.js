import { adminLogin, addUser } from "../services/adminService.js";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { admin, token } = await adminLogin(username, password);
    res.json({ message: "Login successful", admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await addUser(name, email, password);
    res.json({ message: "User Added", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
