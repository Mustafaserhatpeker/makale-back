import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials.");

  const token = jwt.sign(
    { userId: user._id, userRole: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
};
