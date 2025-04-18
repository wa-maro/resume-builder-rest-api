import PersonalDetail from "../models/personalDetail.model.js";
import Resume from "../models/Resume.model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/customErrors.util.js";

// add new personal detail to a resume
export const addPersonalDetail = async (req, res, next) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) next(new NotFoundError("Resume doesn't exists"));

  // check if personal detail already exist for given resume
  const existingPersonalDetail = await PersonalDetail.findOne({
    resume: resume._id,
  });
  if (existingPersonalDetail)
    next(new ConflictError("Personal Detail already exists"));

  // add personal detail and save it
  const newPersonalDetail = new PersonalDetail({
    resume: resume._id,
    ...req.body,
  });
  if (!newPersonalDetail)
    next(new BadRequestError("Failed to add personal detail"));
  const savedPersonalDetail = await newPersonalDetail.save();

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal detail added successfully",
    personalDetail: savedPersonalDetail,
  });
};

// add new personal detail to a resume
export const getPersonalDetail = async (req, res, next) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) next(new NotFoundError("Resume doesn't exists"));

  // find existing personal detail and return it
  const existingPersonalDetail = await PersonalDetail.findOne({
    resume: resume._id,
    _id: req.params.id,
  });
  if (!existingPersonalDetail)
    next(new NotFoundError("Personal Detail doesn't exists"));

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal detail retrieved successfully",
    personalDetail: existingPersonalDetail,
  });
};

// add new personal detail to a resume
export const updatePersonalDetail = async (req, res, next) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) next(new NotFoundError("Resume doesn't exists"));

  // find existing personal detail and update it
  const updatedPersonalDetail = await PersonalDetail.findOneAndUpdate(
    { resume: resume._id, _id: req.params.id },
    { ...req.body },
    { new: true }
  );
  if (!updatedPersonalDetail)
    next(new NotFoundError("Personal Detail doesn't exists"));

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal detail updated successfully",
    personalDetail: updatedPersonalDetail,
  });
};
