import mongoose from "mongoose";
import WorkExperience from "../../models/WorkExperience.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

export const getWorkExperiences = async (req, res) => {
  const {
    page = 1,
    limit = 25,
    sort = "createdAt",
    position,
    companyName,
  } = req.query;

  const query = {};
  if (position) query.position = { $regex: position, $options: "i" };
  if (companyName)
    query["company.name"] = { $regex: companyName, $options: "i" };

  const experiences = await WorkExperience.find(query)
    .populate("resume", "_id title")
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await WorkExperience.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Work experiences retrieved successfully",
    data: experiences,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

// GET single work experience
export const getWorkExperience = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) throw new NotFoundError("Invalid ID");

  const experience = await WorkExperience.findById(id).populate({
    path: "resume",
    select: "title user",
    populate: { path: "user", select: "username email" },
  });

  if (!experience) throw new NotFoundError("Work experience not found");

  return res.status(200).json({
    success: true,
    message: "Work experience retrieved successfully",
    data: experience,
  });
};

// UPDATE work experience
export const updateWorkExperience = async (req, res) => {
  const { id } = req.params;

  const experience = await WorkExperience.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!experience) throw new NotFoundError("Work experience not found");

  return res.status(200).json({
    success: true,
    message: "Work experience updated successfully",
    data: experience,
  });
};

// HARD DELETE work experience
export const deleteWorkExperience = async (req, res) => {
  const { id } = req.params;

  const experience = await WorkExperience.findByIdAndDelete(id);
  if (!experience) throw new NotFoundError("Work experience not found");

  return res.status(200).json({
    success: true,
    message: "Work experience deleted successfully",
  });
};
