import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

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
    throw new Error("Kullanıcı Zaten Bulunuyor.");
  }

  const user = new User({ name, email, role });
  await user.save();
  return user;
};

export const getUsers = async () => {
  const users = await User.find();
  return users;
};

export const addFileToUser = async (userId, filePath) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Kullanıcı bulunamadı.");
  }
  user.addedFiles.push(filePath);
  await user.save();
  return user;
};
