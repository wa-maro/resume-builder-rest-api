import WorkExperience from "../models/WorkExperience.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";

// add a new work experience for a specific resume
export const addWorkExperience = async (req, res) => {
  const newExperience = req.body;

  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if work experience for this resume already exist
  const existingExperience = await WorkExperience.findOne({
    resume: resume._id,
    company: newExperience.company,
    position: newExperience.position,
    startDate: newExperience.startDate,
  });
  if (existingExperience)
    throw new ConflictError("Work experience already exists");

  // Create and save the new experience
  const experience = new WorkExperience({
    ...newExperience,
    resume: resume._id,
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
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  const workExperiences = await WorkExperience.find({
    resume: resume._id,
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
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if work experience for this resume exists, update and return it
  const workExperience = await WorkExperience.findOneAndUpdate(
    {
      resume: resume._id,
      _id: req.params.id,
    },
    { ...req.body },
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
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if work experience for this resume exists
  const workExperience = await WorkExperience.findOneAndDelete({
    resume: resume._id,
    _id: req.params.id,
  });
  if (!workExperience)
    throw new NotFoundError("Work experience doesn't exists");

  // return json response
  res.status(204).json({
    success: true,
    message: "Work experience deleted successfully",
  });
};
