import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";

export const addProfessionQualification = async (req, res, next) => {
  let newQualifications = req.body.professionQualifications;
  const resumeId = req.params.resumeId;

  try {
    // Check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // Find the education background for this resume
    const educationBackground = await EducationBackground.findOne({
      resume: resumeId,
    });
    if (!educationBackground)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Education background doesn't exist",
      });

    // Ensure qualifications are an array
    newQualifications = Array.isArray(newQualifications)
      ? newQualifications
      : [newQualifications];

    // Push new qualifications with no dulpicates
    // const duplicateQualifications = [];
    // const addedQualifications = [];
    for (const newQualification of newQualifications) {
      const isQualificationexist =
        educationBackground.professionQualifications.some(
          (existingQualification) =>
            existingQualification.qualification ===
              newQualification.qualification &&
            existingQualification.institutionName.trim().toLowerCase() ===
              newQualification.institutionName.trim().toLowerCase() &&
            existingQualification.programme.trim().toLowerCase() ===
              newQualification.programme.trim().toLowerCase()
        );
      if (!isQualificationexist)
        educationBackground.professionQualifications.push(newQualification);
      else
        return res.status(409).json({
          success: false,
          error: "Conflict",
          message: `Duplicate ${newQualification.qualification} qualification`,
        });
    }

    // save and return
    const savedEducationBackground = await educationBackground.save();

    // Return json response
    res.status(201).json({
      success: true,
      message: "Professional qualification added successfully",
      professionQualification:
        savedEducationBackground.professionQualifications,
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
