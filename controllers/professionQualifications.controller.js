import EducationBackground from "../models/EducationBackground.model.js";

export const addProfessionQualification = async (req, res, next) => {
  try {
    // Extract resumeId and data from req.body
    // Find or create EducationBackground
    // Push into professionalQualifications array
    // Save and return response
    res.status(201).json({
      success: true,
      message: "Professional qualification added successfully",
      data: {}, // new qualification
    });
  } catch (error) {
    next(error);
  }
};

export const getProfessionQualifications = async (req, res, next) => {
  try {
    const { resumeId } = req.params;

    // Fetch the education background document by resumeId
    // Return only professionQualifications array in the response
    res.status(201).json({
      success: true,
      message: "Profession qualifications retrieved successfully",
      data: [{}], // return the all education qualifications
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfessionQualification = async (req, res, next) => {
  try {
    // Extract resumeId and qualificationId from route
    // Find the qualification in array and update fields
    // Save and return response
    res.status(200).json({
      success: true,
      message: "Professional qualification updated successfully",
      data: {}, // updated qualification
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProfessionQualification = async (req, res, next) => {
  try {
    // Extract resumeId and qualificationId from route
    // Remove from array
    // Save and return response
    res.status(200).json({
      success: true,
      message: "Professional qualification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
