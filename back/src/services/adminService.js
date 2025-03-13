import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminLogin = async (username, password) => {
  const admin = await Admin.findOne({ username });
  console.log(admin);
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
