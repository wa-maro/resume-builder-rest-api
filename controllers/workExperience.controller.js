import WorkExperience from "../models/WorkExperience.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  addWorkExperienceBodySchema,
  updateWorkExperienceBodySchema,
} from "../utils/validations/workExperience.validation.js";

// -------------------- ADD --------------------
export const addWorkExperience = async (req, res) => {
  // Validate request body
  const { error } = addWorkExperienceBodySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const newExperience = req.body;

  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exist");

  // Check for duplicate
  const existingExperience = await WorkExperience.findOne({
    resume: resume._id,
    "company.name": newExperience.company.name,
    "company.location": newExperience.company.location,
    position: newExperience.position,
    startDate: newExperience.startDate,
  });
  if (existingExperience)
    throw new ConflictError("Work experience already exists");

  // Create and save
  const experience = await WorkExperience.create({
    ...newExperience,
    resume: resume._id,
  });

  res.status(201).json({
    success: true,
    message: "Work experience added successfully",
    workExperience: experience.toObject(),
  });
};

// -------------------- GET --------------------
export const getWorkExperiences = async (req, res) => {
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exist");

  const workExperiences = await WorkExperience.find({
    resume: resume._id,
  }).lean();

  res.status(200).json({
    success: true,
    message: "Work experiences retrieved successfully",
    workExperiences,
  });
};

// -------------------- UPDATE --------------------
export const updateWorkExperience = async (req, res) => {
  // Validate request body
  const { error } = updateWorkExperienceBodySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exist");

  // Update
  let workExperience;
  try {
    workExperience = await WorkExperience.findOneAndUpdate(
      { resume: resume._id, _id: req.params.id },
      { ...req.body },
      { new: true, runValidators: true }, // ensure schema validation runs
    ).lean();
  } catch (err) {
    if (err.code === 11000) {
      throw new ConflictError("Duplicate work experience for this resume");
    }
    throw err;
  }

  if (!workExperience) throw new NotFoundError("Work experience doesn't exist");

  res.status(200).json({
    success: true,
    message: "Work experience updated successfully",
    workExperience,
  });
};

// -------------------- DELETE --------------------
export const deleteWorkExperience = async (req, res) => {
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exist");

  const workExperience = await WorkExperience.findOneAndDelete({
    resume: resume._id,
    _id: req.params.id,
  });

  if (!workExperience) throw new NotFoundError("Work experience doesn't exist");

  res.status(200).json({
    success: true,
    message: "Work experience deleted successfully",
  });
};
