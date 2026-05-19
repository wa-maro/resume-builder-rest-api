import mongoose from "mongoose";
import Project from "../../models/Project.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

export const getProjects = async (req, res) => {
  const { page = 1, limit = 25, sort = "createdAt", title } = req.query;

  const query = {};
  if (title) query.title = { $regex: title, $options: "i" };

  const projects = await Project.find(query, "_id title image tools")
    .populate("resume")
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  // Add full URL for image
  const host = `${req.protocol}://${req.get("host")}`;
  const projectsWithImageURL = projects.map((project) => ({
    ...project,
    image: project.image ? `${host}/uploads/${project.image}` : null,
  }));

  const total = await Project.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Projects retrieved successfully",
    data: projectsWithImageURL,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

// GET single project
export const getProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    throw new NotFoundError("Invalid project ID");

  const project = await Project.findById(id).populate({
    path: "resume",
    select: "title user",
    populate: { path: "user", select: "username email" },
  });

  if (!project) throw new NotFoundError("Project not found");

  const host = `${req.protocol}://${req.get("host")}`;
  const plainProject = project.toObject(); // <-- important

  const projectsWithImageURL = {
    ...plainProject,
    image: plainProject.image ? `${host}/uploads/${plainProject.image}` : null,
  };

  return res.status(200).json({
    success: true,
    message: "Project retrieved successfully",
    data: projectsWithImageURL,
  });
};

// UPDATE project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updateData = { ...req.body };

  if (req.file) {
    if (!allowedImageTypes.includes(req.file.mimetype))
      return res.status(400).json({
        success: false,
        message: "Only JPEG, PNG, GIF images allowed",
      });
    updateData.image = req.file.filename;
  }

  const project = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!project) throw new NotFoundError("Project not found");

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    data: project,
  });
};

// HARD DELETE project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new NotFoundError("Project not found");

  return res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
};
