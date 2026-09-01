import Project from "../models/Project.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  addProjectBodySchema,
  updateProjectBodySchema,
} from "../utils/validations/project.validation.js";

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

// Add a new project for a specific resume
export const addProject = async (req, res) => {
  // File validation
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "Image is required" });

  if (!allowedImageTypes.includes(req.file.mimetype))
    return res
      .status(400)
      .json({ success: false, message: "Only JPEG, PNG, GIF images allowed" });

  // Joi validation for text fields
  const { error } = addProjectBodySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  // Combine body + file
  const newProjectData = {
    ...req.body,
    image: req.file.filename,
    resume: req.params.resumeId,
  };

  // Check resume
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume not found");

  // Unique project title
  const existingProject = await Project.findOne({
    resume: resume._id,
    title: newProjectData.title,
  });
  if (existingProject) throw new ConflictError("Project already exists");

  // Save
  const project = await Project.create(newProjectData);

  res.status(201).json({
    success: true,
    message: "Project added successfully",
    project,
  });
};

// Get all projects for a specific resume
export const getProjects = async (req, res) => {
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume not found");

  const projects = await Project.find({ resume: resume._id }).lean();

  // Add full URL for image
  const host = `${req.protocol}://${req.get("host")}`;
  const projectsWithImageURL = projects.map((project) => ({
    ...project,
    image: project.image ? `${host}/uploads/${project.image}` : null,
  }));

  res.status(200).json({
    success: true,
    message: "Projects retrieved successfully",
    projects: projectsWithImageURL,
  });
};

// Update an existing project for a specific resume
export const updateProject = async (req, res) => {
  const { error } = updateProjectBodySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const updateData = { ...req.body };

  if (req.file) {
    if (!allowedImageTypes.includes(req.file.mimetype))
      return res.status(400).json({
        success: false,
        message: "Only JPEG, PNG, GIF images allowed",
      });
    updateData.image = req.file.filename;
  }

  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume not found");

  const existingProject = await Project.findOneAndUpdate(
    { resume: resume._id, _id: req.params.id },
    updateData,
    { new: true },
  );
  if (!existingProject) throw new NotFoundError("Project not found");

  res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project: existingProject,
  });
};

// Delete an existing project for a specific resume
export const deleteProject = async (req, res) => {
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume not found");

  const existingProject = await Project.findOneAndDelete({
    resume: resume._id,
    _id: req.params.id,
  });
  if (!existingProject) throw new NotFoundError("Project not found");

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
};
