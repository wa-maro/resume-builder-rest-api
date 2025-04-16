import WorkExperience from "../models/WorkExperience.model.js";

// add a new work experience for a specific resume
export const addWorkExperience = async (req, res, next) => {
  const { resumeId } = req.params;

  try {
    // return json response
    res.status(201).json({
      success: true,
      message: "Work experience added successfully",
    });
  } catch (error) {
    next(error);
  }
};

// get work experiences for a specific resume
export const getWorkExperiences = async (req, res, next) => {
  const { resumeId } = req.params;

  try {
    // return json response
    res.status(200).json({
      success: true,
      message: "Work experiences retrieved successfully",
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
    // return json response
    res.status(200).json({
      success: true,
      message: "Work experience updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// delete work experience for a specific resume
export const deleteWorkExperience = async (req, res, next) => {
  const { resumeId, id } = req.params;

  try {
    // return json response
    res.status(200).json({
      success: true,
      message: "Work experience deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
