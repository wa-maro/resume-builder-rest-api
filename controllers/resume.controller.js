import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

// create a new resume: for specific user
export const createResume = async (req, res) => {
  // check if resume by given user already exist
  const existingResume = await Resume.findOne({ user: req.user.id });
  if (existingResume) throw new ConflictError("Resume already exists");

  // create a resume and save it
  const newResume = new Resume({ user: req.user.id, ...req.body });
  if (!newResume) throw new NotFoundError("Failed to create resume");
  const savedResume = await newResume.save();

  // return json response
  res.status(200).json({
    success: true,
    message: "New resume created successfully",
    data: savedResume,
  });
};

// retrieve existing resume by id: for specific user
export const getResume = async (req, res) => {
  // get a resume by given user and return it
  const existingResume = await Resume.findOne({ user: req.user.id });
  if (!existingResume) throw new NotFoundError("Resume doesn't exists");

  // return json response
  res.status(200).json({
    success: true,
    message: "Resume retrieved successfully",
    data: existingResume,
  });
};

export const updateResume = async (req, res) => {
  // Normalize incoming data
  let updateData = { ...req.body };

  // Handle uploaded file
  if (req.file) {
    if (!allowedImageTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Only JPEG, PNG, GIF images allowed",
      });
    }
    updateData.avatar = req.file.filename; // store filename or URL
  }

  // Update resume for the specific user
  const updatedResume = await Resume.findOneAndUpdate(
    {
      user: req.user.id,
      _id: req.params.resumeId,
    },
    updateData, // <-- use normalized + file data
    { new: true, runValidators: true },
  );

  if (!updatedResume) throw new NotFoundError("Resume doesn't exist");

  res.status(200).json({
    success: true,
    message: "Resume updated successfully",
    data: updatedResume,
  });
};

// delete existing resume by id: for specific user
export const deleteResume = async (req, res) => {
  // get a resume by given user and return it
  const deletedResume = await Resume.findOneAndDelete({
    user: req.user.id,
    _id: req.params.resumeId,
  });
  if (!deletedResume) throw new NotFoundError("Resume doesn't exists");

  // return json response
  res.status(200).json({
    success: true,
    message: "Resume deleted successfully",
  });
};

export const previewResume = async (req, res) => {
  const { template } = req.query; // "minimal" | "classic" | "modern"

  const resume = await Resume.findOne({
    user: req.user.id,
    _id: req.params.resumeId,
  })
    .populate("personalInfo")
    .populate("educationBackground")
    .populate("projects")
    .populate("workExperiences")
    .populate("skills")
    .populate("referees");

  if (!resume) throw new NotFoundError("Resume doesn't exist");

  // Base sections
  let sections = {
    personalInfo: resume.personalInfo,
    educationBackground: resume.educationBackground,
    projects: resume.projects,
    workExperiences: resume.workExperiences,
    skills: resume.skills,
    referees: resume.referees,
  };

  // Apply template-specific filtering
  switch (template) {
    case "minimal":
      sections = {
        personalInfo: sections.personalInfo,
        educationBackground: {
          schoolQualifications:
            sections.educationBackground?.schoolQualifications,
        },
        projects: sections.projects,
        referees: sections.referees?.slice(0, 2) || [],
        // exclude optional sections
        workExperiences: [],
        skills: [],
      };
      break;

    case "classic":
      sections = {
        personalInfo: sections.personalInfo,
        educationBackground: sections.educationBackground,
        projects: sections.projects,
        workExperiences: sections.workExperiences,
        skills: sections.skills,
        referees: sections.referees,
      };
      break;

    case "modern":
    default:
      sections = sections;
      break;
  }

  const previewData = {
    _id: resume._id,
    user: resume.user,
    title: resume.title,
    avatar: resume.avatar,
    summary: resume.summary,
    declaration: resume.declaration,
    createdAt: resume.createdAt,
    updatedAt: resume.updatedAt,
    sections,
  };

  res.status(200).json({
    success: true,
    message: "Resume preview retrieved successfully",
    data: previewData,
  });
};
