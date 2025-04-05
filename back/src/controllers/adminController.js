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
    const log = new Log({
      logContent: `Yeni kullanıcı eklendi: ${name}`,
      logType: "info",
      logState: "Kullanıcı İşlemi",
    });
    await log.save();
    res.json({ message: "Kullanıcı Başarıyla Eklendi.", user });

  } catch (error) {
    const log = new Log({
      logContent: `Kullanıcı eklenirken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Kullanıcı İşlemi",
    });
    await log.save();
    res.status(400).json({ error: error.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json({ users });
  } catch (error) {
    const log = new Log({
      logContent: `Kullanıcıları listeleme sırasında hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Kullanıcı İşlemi",
    });
    await log.save();
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
    const log = new Log({
      logContent: `Yeni dosya eklendi: ${filePath} Kullanıcı: ${user.name}`,
      logType: "info",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.json({ message: "Dosya başarıyla eklendi.", user });
  } catch (error) {

    const log = new Log({
      logContent: `Dosya eklenirken hata oluştu: ${error.message}`,
      logType: "error",
      logState: "Dosya İşlemi",
    });
    await log.save();
    res.status(400).json({ error: error.message });
  }
};
