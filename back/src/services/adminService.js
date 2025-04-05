import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Log from "../models/Log.js";
import User from "../models/User.js";

export const adminLogin = async (username, password) => {
  const admin = await Admin.findOne({ username });

  if (!admin) throw new Error("Kullanıcı bulunamadı.");

  if (password !== admin.password) {
    throw new Error("Kullanıcı adı veya şifre hatalı.");
  }

  const token = jwt.sign(
    { userId: admin._id, userRole: admin.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { admin, token };
};

export const addUser = async (name, email, role) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const log = new Log({
      logContent: `Hakem Ekleme Başarısız, Hakem Zaten Bulunuyor: ${name}`,
      logType: "error",
      logState: "Kullanıcı İşlemleri",
    });
    await log.save();
    throw new Error("Kullanıcı Zaten Bulunuyor.");
  }

  const user = new User({ name, email, role });
  const log = new Log({
    logContent: `Yeni Hakem Eklendi: ${name} (${email})`,
    logType: "success",
    logState: "Kullanıcı İşlemleri",
  });
  await log.save();
  await user.save();
  return user;
};

export const getUsers = async () => {
  const users = await User.find();
  if (!users || users.length === 0) {
    const log = new Log({
      logContent: "Kullanıcı listesi boş.",
      logType: "info",
      logState: "Kullanıcı İşlemleri",
    });
    await log.save();
    throw new Error("Kullanıcı bulunamadı.");
  }
  const log = new Log({
    logContent: `Kullanıcı Listesi: ${users.map((user) => user.name).join(", ")}`,
    logType: "success",
    logState: "Kullanıcı İşlemleri",
  });
  await log.save();
  return users;
};

export const addFileToUser = async (userId, filePath) => {
  const user = await User.findById(userId);
  if (!user) {
    const log = new Log({
      logContent: `Dosya Ekleme Başarısız, Kullanıcı Bulunamadı: ${userId}`,
      logType: "error",
      logState: "Kullanıcı İşlemleri",
    });
    await log.save();
    throw new Error("Kullanıcı bulunamadı.");

  }
  user.addedFiles.push(filePath);
  const log = new Log({
    logContent: `Yeni Dosya Eklendi: ${filePath} Kullanıcı: ${user.name}`,
    logType: "success",
    logState: "Kullanıcı İşlemleri",
  });
  await log.save();
  await user.save();
  return user;
};
