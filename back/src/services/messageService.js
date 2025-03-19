import Message from "../models/Message.js";

export const saveMessage = async (fileId, userId, message) => {
  const newMessage = new Message({ fileId, userId, message });
  await newMessage.save();
  return newMessage;
};

export const getMessagesByFileId = async (fileId) => {
  return await Message.find({ fileId }).populate("userId", "name email");
};
