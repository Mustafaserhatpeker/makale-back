import Message from "../models/Message.js";

export const saveMessage = async (fileId, sender, message) => {
  const newMessage = new Message({ fileId, sender, message });
  await newMessage.save();
  return newMessage;
};

export const getMessagesByFileId = async (fileId) => {
  return await Message.find({ fileId });
};

export const getAllMessages = async () => {
  return await Message.find();
}