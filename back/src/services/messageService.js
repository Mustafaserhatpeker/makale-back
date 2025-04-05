import Message from "../models/Message.js";
import Log from "../models/Log.js";
export const saveMessage = async (fileId, sender, message) => {
  const newMessage = new Message({ fileId, sender, message });
  await newMessage.save();
  return newMessage;
};

export const getMessagesByFileId = async (fileId) => {

  const message = await Message.find({ fileId });
  if (!message) {
    const log = new Log({
      logContent: "Mesaj bulunamadı.",
      logType: "info",
      logState: "Mesaj İşlemleri",
    });
    await log.save();
    return null;
  }

  return message;
};

export const getAllMessages = async () => {
  const messages = await Message.find().sort({ createdAt: -1 });

  if (!messages || messages.length === 0) {
    const log = new Log({
      logContent: "Mesaj bulunamadı.",
      logType: "info",
      logState: "Mesaj İşlemleri",
    });
    await log.save();
    return null;
  }

  const latestMessages = {};

  messages.forEach(msg => {
    if (!latestMessages[msg.sender]) {
      latestMessages[msg.sender] = msg;
    }
  });

  return Object.values(latestMessages);
}