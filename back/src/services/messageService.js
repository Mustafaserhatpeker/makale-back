import Message from "../models/Message.js";
export const addMessage = async (sender, receiver, message) => {
  const mess = new Message({ sender, receiver, message });
  await mess.save();
  return mess;
};
