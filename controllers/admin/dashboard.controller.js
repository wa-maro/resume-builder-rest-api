import Resume from "../../models/Resume.model.js";
import Message from "../../models/Message.model.js";
import User from "../../models/User.model.js";

export const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(9)
    .select("username email role createdAt");

  const totalResumes = await Resume.countDocuments();
  const activeResumes = await Resume.countDocuments({ isActive: true });
  const recentResumes = await Resume.find()
    .sort({ createdAt: -1 })
    .limit(9)
    .select("title user createdAt")
    .populate("user", "username email");

  const totalMessages = await Message.countDocuments({});
  const repliedMessages = await Message.countDocuments({ isReplied: true });
  const pendingMessages = await Message.countDocuments({ isReplied: false });
  const recentMessages = await Message.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(9)
    .select("name email message isReplied createdAt");

  return res.status(200).json({
    success: true,
    message: "Resume stats retrieved successfully",
    data: {
      resumes: {
        total: totalResumes,
        active: activeResumes,
        recent: recentResumes,
      },
      users: {
        total: totalUsers,
        active: activeUsers,
        recent: recentUsers,
      },
      messages: {
        total: totalMessages,
        replied: repliedMessages,
        pending: pendingMessages,
        recent: recentMessages,
      },
    },
  });
};
