import Resume from "../models/Resume.model.js";

// create a new resume: for specific user
export const createResume = async (req, res) => {
  // check if resume by given user already exist
  const existingResume = await Resume.findOne({ user: req.user.id });
  if (existingResume) throw new Error("Resume already exists"); // 409 Conflict

  // create a resume and save it
  const newResume = new Resume({ user: req.user.id, ...req.body });
  if (!newResume) throw new Error("Failed to create resume"); // 400 Bad Request
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
  if (!existingResume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // return json response
  res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    resume: existingResume,
  });
};

// updated existing resume by id: for specific user
export const updateResume = async (req, res) => {
  // get a resume by given user and update it
  const updatedResume = await Resume.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.id,
    },
    { ...req.body },
    { new: true }
  );
  if (!updatedResume) throw new Error("Resume doesn't exists"); // 404 Not Found

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
  if (!deletedResume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // return json response
  res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
  });
};
