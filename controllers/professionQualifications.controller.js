import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";

// add profession qualification(s) for a specific resume
export const addProfessionQualification = async (req, res, next) => {
  let newQualifications = req.body.professionQualifications;
  const resumeId = req.params.resumeId;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resumeId,
  });
  if (!educationBackground)
    return next(new NotFoundError("Education Background doesn't exists"));

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
      next(
        new ConflictError(
          `Duplicate ${newQualification.qualification} qualification`
        )
      );
  }

  // save and return
  const savedEducationBackground = await educationBackground.save();

  // Return json response
  res.status(201).json({
    success: true,
    message: "Professional qualification added successfully",
    professionQualification: savedEducationBackground.professionQualifications,
  });
};

// get profession qualifications for a specific resume
export const getProfessionQualifications = async (req, res, next) => {
  const resumeId = req.params.resumeId;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resumeId,
  });
  if (!educationBackground)
    return next(new NotFoundError("Education Background doesn't exists"));

  // Return json response
  res.status(200).json({
    success: true,
    message: "Profession qualifications retrieved successfully",
    professionQualifications:
      educationBackground?.professionQualifications || [],
  });
};

// update profession qualification for a specific resume
export const updateProfessionQualification = async (req, res, next) => {
  const { resumeId, id } = req.params;
  const updatedQualification = req.body;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resumeId,
  });
  if (!educationBackground)
    return next(new NotFoundError("Education Background doesn't exists"));

  // Find the qualification by ID
  const qualification = educationBackground.professionQualifications.id(id);
  if (!qualification)
    return next(new NotFoundError("Qualification doesn't exists"));

  // Update fields and save
  Object.assign(qualification, updatedQualification);
  await educationBackground.save();

  // Return json response
  res.status(200).json({
    success: true,
    message: "Professional qualification updated successfully",
    professionQualifications: educationBackground.professionQualifications,
  });
};

// delete profession qualification for a specific resume
export const deleteProfessionQualification = async (req, res, next) => {
  const { resumeId, id } = req.params;

  // Check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) return next(new NotFoundError("Resume doesn't exists"));

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resumeId,
  });
  if (!educationBackground)
    return next(new NotFoundError("Education Background doesn't exists"));

  // Find the specific qualification
  const qualification = educationBackground.professionQualifications.id(id);
  if (!qualification)
    return next(new NotFoundError("Qualification doesn't exists"));

  // Remove qualification and save
  educationBackground.professionQualifications.remove(id);
  await educationBackground.save();

  // Return json response
  res.status(204).json({
    success: true,
    message: "Professional qualification deleted successfully",
  });
};
