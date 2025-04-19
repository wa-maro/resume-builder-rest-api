import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";
import { NotFoundError } from "../utils/customErrors.util.js";

// add new education qualifications for a specific resume
export const addEducationQualifications = async (req, res) => {
  // check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if education background exists for given resume
  let educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    educationBackground = new EducationBackground({
      resume: resume._id,
      educationQualifications: [],
      professionalQualifications: [],
    });

  // create a map of existing qualifications by level
  const existingQualifications = new Map();
  for (const qualification of educationBackground.educationQualifications) {
    existingQualifications.set(qualification.level, qualification);
  }

  // add or update while generating new or preserving _id
  for (const qualification of req.body) {
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
};

// get education qualifications for a specific resume
export const getEducationQualifications = async (req, res) => {
  // Check if the resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // get education background by resume id and return it
  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });

  // Return json response
  res.status(200).json({
    success: true,
    message: "Education qualifications retrieved successfully",
    educationQualifications: educationBackground?.educationQualifications || [],
  });
};

// update education qualification for a specific resume
export const updateEducationQualification = async (req, res) => {
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education Background doesn't exists");

  // Find the index of the qualification to update
  const index = educationBackground.educationQualifications.findIndex(
    (qualification) => qualification._id.equals(req.params.id)
  );

  if (index === -1) throw new NotFoundError("Qualification doesn't exists");

  // Preserve the original _id and update the qualification
  educationBackground.educationQualifications[index] = {
    ...educationBackground.educationQualifications[index]._doc,
    ...req.body,
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
};

// add education qualification for a specific resume
export const deleteEducationQualification = async (req, res) => {
  // Check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // Find the education background for this resume
  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education Background doesn't exists");

  // Filter out the qualification by id and save
  const originalLength = educationBackground.educationQualifications.length;
  educationBackground.educationQualifications =
    educationBackground.educationQualifications.filter((qualification) =>
      qualification._id.equals(req.params.id)
    );

  if (educationBackground.educationQualifications.length === originalLength)
    throw new NotFoundError("Qualification doesn't exists");

  await educationBackground.save();

  // return json response
  res.status(204).json({
    success: true,
    message: "Education qualification deleted successfully",
  });
};
