import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";

export const addEducationQualifications = async (req, res, next) => {
  const newQualifications = req.body.educationQualifications;
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

    // check if education background exists for given resume
    let educationBackground = await EducationBackground.findOne({
      resume: resumeId,
    });

    if (!educationBackground)
      educationBackground = new EducationBackground({
        resume: resumeId,
        educationQualifications: [],
        professionalQualifications: [],
      });

    // create a map of existing qualifications by level
    const existingQualifications = new Map();
    for (const qualification of educationBackground.educationQualifications) {
      existingQualifications.set(qualification.level, qualification);
    }

    // add or update while generating new or preserving _id
    for (const qualification of newQualifications) {
      const existing = existingQualifications.get(qualification.level);
      if (existing)
        existingQualifications.set(qualification.level, {
          ...qualification,
          _id: existing._id,
        });
      else existingQualifications.set(qualification.level, qualification);
    }

    // update array and save changes
    educationBackground.educationQualifications = Array.from(
      existingQualifications.values()
    );
    const savedEducationBackground = await educationBackground.save();

    // return json response
    res.status(201).json({
      success: true,
      message: "Education qualification added successfully",
      educationQualifications: savedEducationBackground.educationQualifications,
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
