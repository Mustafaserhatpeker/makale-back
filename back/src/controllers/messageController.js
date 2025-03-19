import {
  saveMessage,
  getMessagesByFileId,
} from "../services/messageService.js";

export const addMessage = async (req, res) => {
  try {
    const { fileId, sender, message } = req.body;

    if (!fileId || !sender || !message) {
      return res.status(400).json({ error: "Eksik parametreler." });
    }

    const newMessage = await saveMessage(fileId, sender, message);
    res
      .status(201)
      .json({ message: "Mesaj başarıyla kaydedildi.", newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { fileId } = req.body;
    if (!fileId) {
      return res.status(400).json({ error: "Dosya ID gerekli." });
    }

    const messages = await getMessagesByFileId(fileId);
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
