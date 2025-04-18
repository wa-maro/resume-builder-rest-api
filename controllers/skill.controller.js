import Skill from "../models/Skill.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError } from "../utils/customErrors.util.js";

// add new skill for a specific resume
export const addSkill = async (req, res, next) => {
  const resumeId = req.params.resumeId;
  const newSkill = req.body;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  // check if skill for this resume already exist
  let existingSkill = await Skill.findOne({
    resume: resumeId,
    type: newSkill.type,
    name: newSkill.name,
  });
  if (existingSkill) return next(new ConflictError("Skill already exists"));

  // Create and save the new experience
  const skill = new Skill({
    ...newSkill,
    resume: resumeId,
  });
  await skill.save();

  // return json response
  res.status(201).json({
    success: true,
    message: "Skill added successfully",
    skill,
  });
};

// get all skill for a specific resume
export const getSkills = async (req, res, next) => {
  const resumeId = req.params.resumeId;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  const skills = await Skill.find({
    resume: resumeId,
  }).lean();

  // return json response
  res.status(200).json({
    success: true,
    message: "Skills retrieved successfully",
    skills,
  });
};

// update existing skill for a specific resume
export const updateSkill = async (req, res, next) => {
  const { resumeId, id } = req.params;
  const updatedSkill = req.body;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  // check if skill for this resume exists, update and return it
  let existingSkill = await Skill.findOneAndUpdate(
    {
      resume: resumeId,
      _id: id,
    },
    { ...updatedSkill },
    { new: true }
  );
  if (!existingSkill) return next(new NotFoundError("Skill doesn't exists"));

  // return json response
  res.status(200).json({
    success: true,
    message: "Skill updated successfully",
    skill: existingSkill,
  });
};

// delete existing skill for a specific resume
export const deleteSkill = async (req, res, next) => {
  const { resumeId, id } = req.params;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  // check if skill for this resume exists, and delete
  let existingSkill = await Skill.findOneAndDelete({
    resume: resumeId,
    _id: id,
  });
  if (!existingSkill) return next(new NotFoundError("Skill doesn't exists"));

  // return json response
  res.status(204).json({
    success: true,
    message: "Skill deleted successfully",
  });
};
