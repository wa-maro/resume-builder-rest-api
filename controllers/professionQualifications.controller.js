import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";

// add profession qualification(s) for a specific resume
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

// get profession qualifications for a specific resume
export const getProfessionQualifications = async (req, res, next) => {
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

    // Return json response
    res.status(200).json({
      success: true,
      message: "Profession qualifications retrieved successfully",
      professionQualifications:
        educationBackground?.professionQualifications || [],
    });
  } catch (error) {
    next(error);
  }
};

// update profession qualification for a specific resume
export const updateProfessionQualification = async (req, res, next) => {
  const { resumeId, id } = req.params;
  const updatedQualification = req.body;

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

    // Find the qualification by ID
    const qualification = educationBackground.professionQualifications.id(id);
    if (!qualification) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Professional qualification not found",
      });
    }

    // Update fields and save
    Object.assign(qualification, updatedQualification);
    await educationBackground.save();

    // Return json response
    res.status(200).json({
      success: true,
      message: "Professional qualification updated successfully",
      professionQualifications: educationBackground.professionQualifications,
    });
  } catch (error) {
    next(error);
  }
};

// delete profession qualification for a specific resume
export const deleteProfessionQualification = async (req, res, next) => {
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

    // Find the specific qualification
    const qualification = educationBackground.professionQualifications.id(id);
    if (!qualification) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Professional qualification not found",
      });
    }

    // Remove qualification and save
    educationBackground.professionQualifications.remove(id);
    await educationBackground.save();

    // Return json response
    res.status(200).json({
      success: true,
      message: "Professional qualification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
