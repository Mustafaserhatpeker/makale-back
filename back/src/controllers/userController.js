import { loginUser } from "../services/userService.js";
export const getProfile = (req, res) => {
  res.json({ message: "User profile", user: req.user });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
