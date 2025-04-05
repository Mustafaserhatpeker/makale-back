import {
  adminLogin,
  addUser,
  getUsers,
  addFileToUser,
} from "../services/adminService.js";
import Log from "../models/Log.js";
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
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
      const log = new Log({
        logContent: "Kullanıcı eklenirken hata oluştu: Eksik parametre.",
        logType: "error",
        logState: "Kullanıcı İşlemi",
      });
      await log.save();
      return res.status(400).json({ error: "Eksik parametre." });
    }
    const user = await addUser(name, email, role);

    res.json({ message: "Kullanıcı Başarıyla Eklendi.", user });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await getUsers();
    if (!users || users.length === 0) {
      const log = new Log({
        logContent: "Kullanıcı listesi boş.",
        logType: "info",
        logState: "Kullanıcı İşlemi",
      });
      await log.save();
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    res.json({ users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addFileToUserController = async (req, res) => {
  try {
    const { userId, filePath } = req.body;
    if (!userId || !filePath) {
      const log = new Log({
        logContent: "Dosya eklenirken hata oluştu: Eksik parametre.",
        logType: "error",
        logState: "Dosya İşlemi",
      });
      await log.save();
      return res.status(400).json({ error: "Eksik parametre." });
    }
    const user = await addFileToUser(userId, filePath);
    res.json({ message: "Dosya başarıyla eklendi.", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
