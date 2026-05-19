import Message from "../models/Message.model.js";
import { BadRequestError } from "../utils/customErrors.util.js";

/**
 * Create a new message (from public users)
 */
export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = new Message({
    name,
    email,
    message,
  });
  if (!newMessage) throw new BadRequestError("Failed to save message");

  await newMessage.save();

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
  });
};
