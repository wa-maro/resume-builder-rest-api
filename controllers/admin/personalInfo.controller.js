import PersonalInfo from "../../models/PersonalInfo.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

// GET all personal info
export const getPersonalInfos = async (req, res) => {
  const {
    page = 1,
    limit = 25,
    sort = "createdAt",
    fullName,
    email,
    phone,
  } = req.query;

  const query = {};
  if (fullName) query.fullName = { $regex: fullName, $options: "i" };
  if (email) query.email = { $regex: email, $options: "i" };
  if (phone) query.phone = { $regex: phone, $options: "i" };

  const personalInfos = await PersonalInfo.find(
    query,
    "_id fullName gender phone email physicalAddress"
  )
    .populate("resume", "_id title")
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await PersonalInfo.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: personalInfos,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

// GET single personal info (by ID or resume ID)
export const getPersonalInfo = async (req, res) => {
  const { id } = req.params;

  const personalInfo = await PersonalInfo.findById(id).populate({
    path: "resume",
    select: "title user",
    populate: { path: "user", select: "username" },
  });

  if (!personalInfo) throw new NotFoundError("Personal information not found");

  return res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: personalInfo,
  });
};

// UPDATE personal info
export const updatePersonalInfo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const personalInfo = await PersonalInfo.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!personalInfo) throw new NotFoundError("Personal information not found");

  return res.status(200).json({
    success: true,
    message: "Personal information updated successfully",
    data: personalInfo,
  });
};

// HARD DELETE personal info
export const deletePersonalInfo = async (req, res) => {
  const { id } = req.params;

  const personalInfo = await PersonalInfo.findByIdAndDelete(id);
  if (!personalInfo) throw new NotFoundError("Personal information not found");

  return res.status(200).json({
    success: true,
    message: "Personal information deleted successfully",
  });
};
