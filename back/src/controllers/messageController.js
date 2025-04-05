import {
  saveMessage,
  getMessagesByFileId,
  getAllMessages,
} from "../services/messageService.js";
import Log from "../models/Log.js";
export const addMessage = async (req, res) => {
  try {
    const { fileId, sender, message } = req.body;

    if (!fileId || !sender || !message) {
      const log = new Log({
        logContent: "Mesaj Gönderimi Başarısız, Eksik Bilgi Tespit Edildi.",
        logType: "error",
        logState: "Mesaj İşlemleri",
      });
      await log.save();
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

export const getMessagesByFileIdController = async (req, res) => {
  try {
    const { fileId } = req.body;
    if (!fileId) {
      const log = new Log({
        logContent: "Mesaj İçeriği Geririlirken Hata: Dosya ID gerekli.",
        logType: "error",
        logState: "Mesaj İşlemleri",
      });
      await log.save();
      return res.status(400).json({ error: "Dosya ID gerekli." });
    }
    const messages = await getMessagesByFileId(fileId);
    res.json({ messages });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

export const getAllMessagesController = async (req, res) => {
  try {
    const messages = await getAllMessages();
    if (!messages || messages.length === 0) {
      const log = new Log({
        logContent: "Mesaj bulunamadı.",
        logType: "info",
        logState: "Mesaj İşlemleri",
      });
      await log.save();
      return res.status(404).json({ error: "Mesaj bulunamadı." });
    }
    res.json({ messages });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
}