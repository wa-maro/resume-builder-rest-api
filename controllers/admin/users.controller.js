import User from "../../models/User.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

export const getUsers = async (req, res) => {
  const {
    page = 1,
    limit = 25,
    sort = "createdAt",
    role,
    isActive,
  } = req.query;

  const query = {};
  if (role) query.role = role;
  if (isActive !== undefined) query.isActive = isActive === "true";

  const users = await User.find(query)
    .populate("resume", "_id title")
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await User.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

export const getUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).populate("resume", "_id title");
  if (!user) throw new NotFoundError("User not found");

  return res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

export const updateUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOneAndUpdate(
    { username },
    { ...req.body },
    { new: true, runValidators: true }
  );

  if (!user) throw new NotFoundError("User not found");

  return res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
};

export const deleteUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOneAndUpdate(
    { username },
    { isActive: false },
    { new: true }
  );

  if (!user) throw new NotFoundError("User not found");

  return res.status(200).json({
    success: true,
    message: "User deactivated successfully",
  });
};
