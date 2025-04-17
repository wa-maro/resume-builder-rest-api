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
    // check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exists",
      });

    const skills = await Skill.find({
      resume: resumeId,
    }).lean();

    // return json response
    res.status(200).json({
      success: true,
      message: "Skills retrieved successfully",
      skills,
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
    // check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exists",
      });

    // check if skill for this resume exists, update and return it
    let existingSkill = await Skill.findOneAndUpdate(
      {
        resume: resumeId,
        _id: id,
      },
      { ...updatedSkill },
      { new: true }
    );
    if (!existingSkill)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Skill doesn't not exist",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill: existingSkill,
    });
  } catch (error) {
    next(error);
  }
}

// delete existing skill for a specific resume
export async function deleteSkill(req, res, next) {
  const { resumeId, id } = req.params;
  try {
    // check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exists",
      });

    // check if skill for this resume exists, and delete
    let existingSkill = await Skill.findOneAndDelete({
      resume: resumeId,
      _id: id,
    });
    if (!existingSkill)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Skill doesn't not exist",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
