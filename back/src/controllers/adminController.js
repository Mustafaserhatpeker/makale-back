import {
  adminLogin,
  addUser,
  getUsers,
  addFileToUser,
} from "../services/adminService.js";

export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { admin, token } = await adminLogin(username, password);
    res.json({ message: "Giriş Başarılı.", admin, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await addUser(name, email, password, role);
    res.json({ message: "Kullanıcı Başarıyla Eklendi.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addFileToUserController = async (req, res) => {
  try {
    const { userId, filePath } = req.body;
    const user = await addFileToUser(userId, filePath);
    res.json({ message: "Dosya başarıyla eklendi.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
