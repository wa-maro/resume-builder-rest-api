import WorkExperience from "../models/WorkExperience.model.js";
import Resume from "../models/Resume.model.js";

// add a new work experience for a specific resume
export const addWorkExperience = async (req, res, next) => {
  const { resumeId } = req.params;
  const newExperience = req.body;

  try {
    // Check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // check if work experience for this resume already exist
    const existingExperience = await WorkExperience.findOne({
      resume: resumeId,
      company: newExperience.company,
      position: newExperience.position,
      startDate: newExperience.startDate,
    });
    if (existingExperience)
      return res.status(409).json({
        success: false,
        error: "Conflict",
        message: "Work experience already exist",
      });

    // Create and save the new experience
    const experience = new WorkExperience({
      ...newExperience,
      resume: resumeId,
    });
    await experience.save();

    // return json response
    res.status(201).json({
      success: true,
      message: "Work experience added successfully",
      workExperience: experience,
    });
  } catch (error) {
    next(error);
  }
};

// get work experiences for a specific resume
export const getWorkExperiences = async (req, res, next) => {
  const { resumeId } = req.params;

  try {
    // Check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    const workExperiences = await WorkExperience.find({
      resume: resumeId,
    }).lean();

    // return json response
    res.status(200).json({
      success: true,
      message: "Work experiences retrieved successfully",
      workExperiences,
    });
  } catch (error) {
    next(error);
  }
};

// update work experience for a specific resume
export const updateWorkExperience = async (req, res, next) => {
  const { resumeId, id } = req.params;
  const updatedExperience = req.body;

  try {
    // Check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // check if work experience for this resume exists, update and return it
    const workExperience = await WorkExperience.findOneAndUpdate(
      {
        resume: resumeId,
        _id: id,
      },
      { ...updatedExperience },
      { new: true }
    );
    if (!workExperience)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Work experience doesn't exist",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Work experience updated successfully",
      workExperience,
    });
  } catch (error) {
    next(error);
  }
};

// delete work experience for a specific resume
export const deleteWorkExperience = async (req, res, next) => {
  const { resumeId, id } = req.params;

  try {
    // Check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // check if work experience for this resume exists
    const workExperience = await WorkExperience.findOneAndDelete({
      resume: resumeId,
      _id: id,
    });
    if (!workExperience)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Work experience doesn't exist",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Work experience deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
