import mongoose from "mongoose";
import Skill from "../../models/Skill.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

export const getSkills = async (req, res) => {
  const {
    page = 1,
    limit = 25,
    sort = "createdAt",
    resumeId,
    category,
    name,
  } = req.query;

  const query = {};
  if (resumeId && mongoose.isValidObjectId(resumeId)) query.resume = resumeId;
  if (category) query.category = category;
  if (name) query.name = { $regex: name, $options: "i" };

  const skills = await Skill.find(query)
    .populate({
      path: "resume",
      select: "title user",
      populate: { path: "user", select: "username email" },
    })
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await Skill.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Skills retrieved successfully",
    data: skills,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

export const getSkill = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    throw new NotFoundError("Invalid skill ID");

  const skill = await Skill.findById(id).populate({
    path: "resume",
    select: "title user",
    populate: { path: "user", select: "username email" },
  });

  if (!skill) throw new NotFoundError("Skill not found");

  const host = `${req.protocol}://${req.get("host")}`;
  const plainSkill = skill.toObject(); // <-- important

  const skillWithFileURL = {
    ...plainSkill,
    certificate: plainSkill.certificate
      ? `${host}/uploads/${plainSkill.certificate}`
      : null,
  };

  return res.status(200).json({
    success: true,
    message: "Skill retrieved successfully",
    data: skillWithFileURL,
  });
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;

  const updateData = { ...req.body };

  if (req.file) {
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed for certificate",
      });
    }
    updateData.certificate = req.file.filename;
  }

  const skill = await Skill.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!skill) throw new NotFoundError("Skill not found");

  return res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    data: skill,
  });
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;

  const skill = await Skill.findByIdAndDelete(id);
  if (!skill) throw new NotFoundError("Skill not found");

  return res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
};
