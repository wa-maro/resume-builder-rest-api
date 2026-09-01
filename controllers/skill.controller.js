import Skill from "../models/Skill.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  addSkillBodySchema,
  updateSkillBodySchema,
} from "../utils/validations/skills.validation.js";

// add new skill for a specific resume
export const addSkill = async (req, res) => {
  try {
    // Validate request body
    const { error } = addSkillBodySchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    const newSkill = req.body;

    // Check if resume exists
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume not found");

    // Check if skill for this resume already exists
    const existingSkill = await Skill.findOne({
      resume: resume._id,
      category: newSkill.category,
      name: newSkill.name,
    });
    if (existingSkill) throw new ConflictError("Skill already exists");

    // Handle certificate (PDF only)
    if (req.file) {
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed for certificate",
        });
      }
      newSkill.certificate = req.file.filename;
    }

    // Create and save the new skill
    const skill = new Skill({
      ...newSkill,
      resume: resume._id,
    });
    await skill.save();

    // Return JSON response
    res.status(201).json({
      success: true,
      message: "Skill added successfully",
      skill,
    });
  } catch (err) {
    console.error("Error in addSkill:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get all skill for a specific resume
export const getSkills = async (req, res) => {
  try {
    // Check if resume exists
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume not found");

    const skills = await Skill.find({ resume: resume._id }).lean();

    // Add full URL for certificate if exists
    const host = `${req.protocol}://${req.get("host")}`;
    const skillsWithURL = skills.map((s) => ({
      ...s,
      certificate: s.certificate ? `${host}/uploads/${s.certificate}` : null,
    }));

    // Return JSON response
    res.status(200).json({
      success: true,
      message: "Skills retrieved successfully",
      skills: skillsWithURL,
    });
  } catch (err) {
    console.error("Error in getSkills:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// update existing skill for a specific resume
export const updateSkill = async (req, res) => {
  try {
    // Validate request body
    const { error } = updateSkillBodySchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    // Check if resume exists
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume not found");

    const updateData = { ...req.body };

    // Handle certificate (PDF only)
    if (req.file) {
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed for certificate",
        });
      }
      updateData.certificate = req.file.filename;
    }

    // Find and update skill
    const existingSkill = await Skill.findOneAndUpdate(
      {
        resume: resume._id,
        _id: req.params.id,
      },
      updateData,
      { new: true },
    );
    if (!existingSkill) throw new NotFoundError("Skill not found");

    // Return JSON response
    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill: existingSkill,
    });
  } catch (err) {
    console.error("Error in updateSkill:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// delete existing skill for a specific resume
export const deleteSkill = async (req, res) => {
  // check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume not found");

  // check if skill for this resume exists, and delete
  let existingSkill = await Skill.findOneAndDelete({
    resume: resume._id,
    _id: req.params.id,
  });
  if (!existingSkill) throw new NotFoundError("Skill not found");

  // return json response
  res.status(200).json({
    success: true,
    message: "Skill deleted successfully",
  });
};
