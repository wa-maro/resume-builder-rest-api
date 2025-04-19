import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";

// add profession qualification(s) for a specific resume
export const addProfessionQualification = async (req, res) => {
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education Background doesn't exists");

  // Ensure qualifications are an array
  const newQualifications = Array.isArray(req.body) ? req.body : [req.body];

  // Push new qualifications with no dulpicates
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
      new ConflictError(
        `Duplicate ${newQualification.qualification} qualification`
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
export const getProfessionQualifications = async (req, res) => {
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education Background doesn't exists");

  // Return json response
  res.status(200).json({
    success: true,
    message: "Profession qualifications retrieved successfully",
    professionQualifications:
      educationBackground?.professionQualifications || [],
  });
};

// update profession qualification for a specific resume
export const updateProfessionQualification = async (req, res) => {
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education Background doesn't exists");

  // Find the qualification by ID
  const qualification = educationBackground.professionQualifications.id(
    req.params.id
  );
  if (!qualification) throw new NotFoundError("Qualification doesn't exists");

  // Update fields and save
  Object.assign(qualification, req.body);
  await educationBackground.save();

  // Return json response
  res.status(200).json({
    success: true,
    message: "Professional qualification updated successfully",
    professionQualifications: educationBackground.professionQualifications,
  });
};

// delete profession qualification for a specific resume
export const deleteProfessionQualification = async (req, res) => {
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education Background doesn't exists");

  // Find the specific qualification
  const qualification = educationBackground.professionQualifications.id(
    req.params.id
  );
  if (!qualification) throw new NotFoundError("Qualification doesn't exists");

  // Remove qualification and save
  educationBackground.professionQualifications.remove(qualification._id);
  await educationBackground.save();

  // Return json response
  res.status(204).json({
    success: true,
    message: "Professional qualification deleted successfully",
  });
};
