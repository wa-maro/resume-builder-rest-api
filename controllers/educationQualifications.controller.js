import EducationBackground from "../models/EducationBackground.model.js";

export const addEducationQualification = async (req, res, next) => {
  try {
    // Extract resumeId from route params and data from req.body
    // Find or create EducationBackground for the resume
    // Check for existing level (enforce one per level)
    // Push or update qualification
    // Save and return success response
    res.status(201).json({
      success: true,
      message: "Education qualification added successfully",
      data: {}, // return the updated qualification or background
    });
  } catch (error) {
    next(error);
  }
};

export const getEducationQualifications = async (req, res, next) => {
  try {
    // Fetch the education background document by resumeId
    // Return only educationQualifications array in the response
    res.status(201).json({
      success: true,
      message: "Education qualifications retrieved successfully",
      data: [{}], // return the all education qualifications
    });
  } catch (error) {
    next(error);
  }
};

export const updateEducationQualification = async (req, res, next) => {
  try {
    // Extract resumeId and level from route
    // Find and update matching qualification in the array
    // Save and return success response
    res.status(200).json({
      success: true,
      message: "Education qualification updated successfully",
      data: {}, // updated qualification
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEducationQualification = async (req, res, next) => {
  try {
    // Extract resumeId and level from route
    // Pull out matching entry from the array
    // Save and return success response
    res.status(200).json({
      success: true,
      message: "Education qualification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
