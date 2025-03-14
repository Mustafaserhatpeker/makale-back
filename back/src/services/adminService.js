import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
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

export const addUser = async (name, email, password, role) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Kullanıcı Zaten Bulunuyor.");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role });
  await user.save();
  return user;
};
