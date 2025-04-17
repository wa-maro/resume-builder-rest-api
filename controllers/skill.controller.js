import Skill from "../models/Skill.model.js";
import Resume from "../models/Resume.model.js";

// add new skill for a specific resume
export async function addSkill(req, res, next) {
  const resumeId = req.params.resumeId;
  const newSkill = req.body;

  try {
    // check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exists",
      });

    // check if skill for this resume already exist
    let existingSkill = await Skill.findOne({
      resume: resumeId,
      type: newSkill.type,
      name: newSkill.name,
    });
    if (existingSkill)
      return res.status(409).json({
        success: false,
        error: "Conflict",
        message: "Skill already exist",
      });

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
  } catch (error) {
    next(error);
  }
}

// get all skill for a specific resume
export async function getSkills(req, res, next) {
  const resumeId = req.params.resumeId;
  try {
    res.status(200).json({
      success: true,
      message: "Skills retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
}

// update existing skill for a specific resume
export async function updateSkill(req, res, next) {
  const { resumeId, id } = req.params;
  const updatedSkill = req.body;

  try {
    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
    });
  } catch (error) {
    next({});
  }
}

// delete existing skill for a specific resume
export async function deleteSkill(req, res, next) {
  const { resumeId, id } = req.params;
  try {
    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
