import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  createResumeBodySchema,
  updateResumeBodySchema,
} from "../utils/validators.util.js";

// create a new resume: for specific user
export const createResume = async (req, res) => {
  // validate and sanitize request
  const { error, value } = createResumeBodySchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  // check if resume by given user already exist
  const existingResume = await Resume.findOne({ user: req.user.id });
  if (existingResume) throw new ConflictError("Resume already exists");

  // create a resume and save it
  const newResume = new Resume({ user: req.user.id, ...value });
  if (!newResume) throw new NotFoundError("Failed to create resume");
  const savedResume = await newResume.save();

  // return json response
  res.status(200).json({
    success: true,
    message: "New resume created successfully",
    resume: savedResume,
  });
};

// retrieve existing resume by id: for specific user
export const getResume = async (req, res) => {
  // get a resume by given user and return it
  const existingResume = await Resume.findOne({
    user: req.user.id,
    _id: req.params.id,
  });
  if (!existingResume) throw new NotFoundError("Resume doesn't exists");

  // return json response
  res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    resume: existingResume,
  });
};

// updated existing resume by id: for specific user
export const updateResume = async (req, res) => {
  // validate and sanitize request
  const { error, value } = updateResumeBodySchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  // get a resume by given user and update it
  const updatedResume = await Resume.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.id,
    },
    { ...value },
    { new: true }
  );
  if (!updatedResume) throw new NotFoundError("Resume doesn't exists");

  // return json response
  res.status(200).json({
    success: true,
    message: "Resume updated successfully",
    resume: updatedResume,
  });
};

// delete existing resume by id: for specific user
export const deleteResume = async (req, res) => {
  // get a resume by given user and return it
  const deletedResume = await Resume.findOneAndDelete({
    user: req.user.id,
    _id: req.params.id,
  });
  if (!deletedResume) throw new NotFoundError("Resume doesn't exists");

  // return json response
  res.status(204).json({
    success: true,
    message: "Resume deleted successfully",
  });
};
