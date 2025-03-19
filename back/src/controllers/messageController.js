import { addMessage } from "../services/messageService.js";

export const addMessageController = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const mess = await addMessage(sender, receiver, message);
    res.json({ message: "Kullanıcı Başarıyla Eklendi.", mess });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
