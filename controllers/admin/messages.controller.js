import Message from "../../models/Message.model.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const getMessages = async (req, res) => {
  const messages = await Message.find({ isActive: true }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    message: "Messages fetched successfully",
    data: messages,
  });
};

export const getMessage = async (req, res) => {
  const { id } = req.params;

  const message = await Message.findById(id);
  if (!message) throw new NotFoundError("message not found");

  res.status(200).json({
    success: true,
    message: "Message fetched successfully",
    data: message,
  });
};

export const replyMessage = async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  const message = await Message.findById(id);
  if (!message) throw new NotFoundError("Message not found");

  // 1. Save reply in DB
  message.reply = reply;
  message.isReplied = true;
  await message.save();

  // 2. Send email to user
  await sendEmail({
    to: message.email,
    subject: "Reply to your message",
    text: reply,
    html: `<p>Hello ${message.name},</p><p>${reply}</p><br><p>Best regards,<br>Admin Team</p>`,
  });

  res.status(200).json({
    success: true,
    message: "Reply sent successfully",
    data: message,
  });
};

export const deactivateMessage = async (req, res) => {
  const { id } = req.params;

  const message = await Message.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  if (!message) throw new NotFoundError("Message not found");

  return res.status(200).json({
    success: true,
    message: "Message deactivated successfully",
  });
};
