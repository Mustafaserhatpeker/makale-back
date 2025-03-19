import { loginUser } from "../services/userService.js";
export const getProfile = (req, res) => {
  res.json({ message: "Kullanıcı Profili:", user: req.user });
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);
    res.json({ message: "Giriş Başarılı.", user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
