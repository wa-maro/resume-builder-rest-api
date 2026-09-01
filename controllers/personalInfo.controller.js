import PersonalInfo from "../models/PersonalInfo.model.js";
import Resume from "../models/Resume.model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/customErrors.util.js";

// add new personal information to a resume
export const addPersonalInfo = async (req, res) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if personal information already exist for given resume
  const existingInfo = await PersonalInfo.findOne({
    resume: resume._id,
  }).select("-__v");
  if (existingInfo)
    throw new ConflictError("Personal Information already exists");

  // add personal information and save it
  const newInfo = new PersonalInfo({ resume: resume._id, ...req.body });
  if (!newInfo) throw new BadRequestError("Failed to add personal information");
  const savedInfo = await newInfo.save();

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal information added successfully",
    data: savedInfo,
  });
};

// get exisitng personal information to a resume
export const getPersonalInfo = async (req, res) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // find existing personal information and return it
  const existingInfo = await PersonalInfo.findOne({
    resume: resume._id,
  }).select("-__v");
  if (!existingInfo)
    throw new NotFoundError("Personal information doesn't exists");

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal information retrieved successfully",
    data: existingInfo,
  });
};

// add new personal information to a resume
export const updatePersonalInfo = async (req, res) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // find existing personal information and update it
  const updatedInfo = await PersonalInfo.findOneAndUpdate(
    { resume: resume._id, _id: req.params.id },
    { ...req.body },
    { new: true },
  );
  if (!updatedInfo)
    throw new NotFoundError("Personal information doesn't exists");

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal information updated successfully",
    data: updatedInfo,
  });
};
