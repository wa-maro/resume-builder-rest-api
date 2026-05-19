import mongoose from "mongoose";
import Referee from "../../models/Referee.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

// GET all referees
export const getReferees = async (req, res) => {
  const {
    page = 1,
    limit = 25,
    sort = "createdAt",
    resumeId,
    fullName,
    email,
    phone,
  } = req.query;

  const query = {};
  if (resumeId && mongoose.isValidObjectId(resumeId)) query.resume = resumeId;
  if (fullName) query.fullName = { $regex: fullName, $options: "i" };
  if (email) query.email = { $regex: email, $options: "i" };
  if (phone) query.phone = { $regex: phone, $options: "i" };

  const referees = await Referee.find(query)
    .populate({
      path: "resume",
      select: "title user",
      populate: { path: "user", select: "username email" },
    })
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await Referee.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Referees retrieved successfully",
    data: referees,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

// GET single referee
export const getReferee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    throw new NotFoundError("Invalid referee ID");

  const referee = await Referee.findById(id).populate({
    path: "resume",
    select: "title user",
    populate: { path: "user", select: "username email" },
  });

  if (!referee) throw new NotFoundError("Referee not found");

  return res.status(200).json({
    success: true,
    message: "Referee retrieved successfully",
    data: referee,
  });
};

// UPDATE referee
export const updateReferee = async (req, res) => {
  const { id } = req.params;

  const referee = await Referee.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!referee) throw new NotFoundError("Referee not found");

  return res.status(200).json({
    success: true,
    message: "Referee updated successfully",
    data: referee,
  });
};

// HARD DELETE referee
export const deleteReferee = async (req, res) => {
  const { id } = req.params;

  const referee = await Referee.findByIdAndDelete(id);
  if (!referee) throw new NotFoundError("Referee not found");

  return res.status(200).json({
    success: true,
    message: "Referee deleted successfully",
  });
};
