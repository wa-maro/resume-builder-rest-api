import WorkExperience from "../models/WorkExperience.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  addWorkExperienceBodySchema,
  updateWorkExperienceBodySchema,
} from "../utils/validators.util.js";

// add a new work experience for a specific resume
export const addWorkExperience = async (req, res) => {
  // validate and sanitize request
  const { error, value } = addWorkExperienceBodySchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const { resumeId } = req.params;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if work experience for this resume already exist
  const existingExperience = await WorkExperience.findOne({
    resume: resumeId,
    company: value.company,
    position: value.position,
    startDate: value.startDate,
  });
  if (existingExperience)
    throw new ConflictError("Work experience already exists");

  // Create and save the new experience
  const experience = new WorkExperience({
    ...value,
    resume: resumeId,
  });
  await experience.save();

  // return json response
  res.status(201).json({
    success: true,
    message: "Work experience added successfully",
    workExperience: experience,
  });
};

// get work experiences for a specific resume
export const getWorkExperiences = async (req, res) => {
  const { resumeId } = req.params;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  const workExperiences = await WorkExperience.find({
    resume: resumeId,
  }).lean();

  // return json response
  res.status(200).json({
    success: true,
    message: "Work experiences retrieved successfully",
    workExperiences,
  });
};

// update work experience for a specific resume
export const updateWorkExperience = async (req, res) => {
  // validate and sanitize request
  const { error, value } = updateWorkExperienceBodySchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const { resumeId, id } = req.params;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if work experience for this resume exists, update and return it
  const workExperience = await WorkExperience.findOneAndUpdate(
    {
      resume: resumeId,
      _id: id,
    },
    { ...value },
    { new: true }
  );
  if (!workExperience)
    throw new NotFoundError("Work experience doesn't exists");

  // return json response
  res.status(200).json({
    success: true,
    message: "Work experience updated successfully",
    workExperience,
  });
};

// delete work experience for a specific resume
export const deleteWorkExperience = async (req, res) => {
  const { resumeId, id } = req.params;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if work experience for this resume exists
  const workExperience = await WorkExperience.findOneAndDelete({
    resume: resumeId,
    _id: id,
  });
  if (!workExperience)
    throw new NotFoundError("Work experience doesn't exists");

  // return json response
  res.status(204).json({
    success: true,
    message: "Work experience deleted successfully",
  });
};
