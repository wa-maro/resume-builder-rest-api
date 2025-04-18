import PersonalDetail from "../models/personalDetail.model.js";
import Resume from "../models/Resume.model.js";

// add new personal detail to a resume
export const addPersonalDetail = async (req, res) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // check if personal detail already exist for given resume
  const existingPersonalDetail = await PersonalDetail.findOne({
    resume: resume._id,
  });
  if (existingPersonalDetail) throw new Error("Personal Detail already exists"); // 409 Conflict

  // add personal detail and save it
  const newPersonalDetail = new PersonalDetail({
    resume: resume._id,
    ...req.body,
  });
  if (!newPersonalDetail) throw new Error("Failed to add personal detail"); // 400 Bad Request
  const savedPersonalDetail = await newPersonalDetail.save();

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal detail added successfully",
    personalDetail: savedPersonalDetail,
  });
};

// add new personal detail to a resume
export const getPersonalDetail = async (req, res) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // find existing personal detail and return it
  const existingPersonalDetail = await PersonalDetail.findOne({
    resume: resume._id,
    _id: req.params.id,
  });
  if (!existingPersonalDetail)
    throw new Error("Personal Detail doesn't exists"); // 404 Not Found

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal detail retrieved successfully",
    personalDetail: existingPersonalDetail,
  });
};

// add new personal detail to a resume
export const updatePersonalDetail = async (req, res) => {
  // check if the resume exists and return it
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // find existing personal detail and update it
  const updatedPersonalDetail = await PersonalDetail.findOneAndUpdate(
    { resume: resume._id, _id: req.params.id },
    { ...req.body },
    { new: true }
  );
  if (!updatedPersonalDetail) throw new Error("Personal Detail doesn't exists"); // 404 Not Found

  // return json response
  res.status(200).json({
    success: true,
    message: "Personal detail updated successfully",
    personalDetail: updatedPersonalDetail,
  });
};
