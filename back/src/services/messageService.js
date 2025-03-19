import Message from "../models/Message.js";
export const addMessage = async (sender, receiver, message) => {
  const message = new Message({ sender, receiver, message });
  await message.save();
  return message;
};
