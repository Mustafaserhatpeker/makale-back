import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Kullanıcı Bulunamadı.");

  if (user.password !== password)
    throw new Error("Kullanıcı Adı veya Şifre Hatalı.");

  const token = jwt.sign(
    { userId: user._id, userRole: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
};
