import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";

// add new education qualifications for a specific resume
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

// get education qualifications for a specific resume
export const getEducationQualifications = async (req, res, next) => {
  const resumeId = req.params.resumeId;

  try {
    // Check if the resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // get education background by resume id and return it
    const educationBackground = await EducationBackground.findOne({
      resume: resumeId,
    });

    // Return json response
    res.status(200).json({
      success: true,
      message: "Education qualifications retrieved successfully",
      educationQualifications:
        educationBackground?.educationQualifications || [],
    });
  } catch (error) {
    next(error);
  }
};

// update education qualification for a specific resume
export const updateEducationQualification = async (req, res, next) => {
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
        message: "Education background not found",
      });

    // Find the index of the qualification to update
    const index = educationBackground.educationQualifications.findIndex(
      (qualification) => qualification._id.equals(id)
    );

    if (index === -1)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: `Education qualification not found`,
      });

    // Preserve the original _id and update the qualification
    educationBackground.educationQualifications[index] = {
      ...educationBackground.educationQualifications[index]._doc,
      ...updatedQualification,
    };

    // Save changes
    const savedEducationBackground = await educationBackground.save();

    // Save and return success response
    res.status(200).json({
      success: true,
      message: "Education qualification updated successfully",
      educationQualification:
        savedEducationBackground.educationQualifications[index]._doc,
    });
  } catch (error) {
    next(error);
  }
};

// add education qualification for a specific resume
export const deleteEducationQualification = async (req, res, next) => {
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

    // Filter out the qualification by id and save
    const originalLength = educationBackground.educationQualifications.length;
    educationBackground.educationQualifications =
      educationBackground.educationQualifications.filter((qualification) =>
        qualification._id.equals(id)
      );

    if (educationBackground.educationQualifications.length === originalLength)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: `Qualification doesn't exist`,
      });

    await educationBackground.save();

    // return json response
    res.status(200).json({
      success: true,
      message: "Education qualification deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
