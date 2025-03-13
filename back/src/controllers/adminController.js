import { addUser } from "../services/authService.js";

export const add = async (req, res) => {
  try {
    const { username, password, addedUserMail, addedUserPassword } = req.body;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
