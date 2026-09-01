import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  addAcademicQualificationBodySchema,
  updateAcademicQualificationBodySchema,
} from "../utils/validations/education.validation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Add new academic qualification(s) for a specific resume
 */
export const addAcademicQualification = async (req, res) => {
  try {
    // Optional file validation
    const { certificate, transcript } = req.files || {};

    if (certificate && certificate[0].mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed for certificates",
      });
    }

    if (transcript && transcript[0].mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed for transcripts",
      });
    }

    // Validate request body
    const { error } = addAcademicQualificationBodySchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    // Check if resume exists
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume doesn't exist");

    // Find or create education background
    let educationBackground = await EducationBackground.findOne({
      resume: resume._id,
    });
    if (!educationBackground) {
      educationBackground = new EducationBackground({
        resume: resume._id,
        schoolQualifications: [],
        academicQualifications: [],
      });
    }

    // Avoid duplicates
    const isDuplicate = educationBackground.academicQualifications.some(
      (q) =>
        q.level === req.body.level &&
        q.award.trim().toLowerCase() === req.body.award.trim().toLowerCase() &&
        q.institution.name.trim().toLowerCase() ===
          req.body.institution.name.trim().toLowerCase(),
    );
    if (isDuplicate)
      throw new ConflictError(`Duplicate ${req.body.level} qualification`);

    // Save new academic qualification
    const newQualification = {
      ...req.body,
      certificate: certificate?.[0]?.filename, // optional
      transcript: transcript?.[0]?.filename, // optional
    };

    educationBackground.academicQualifications.push(newQualification);
    const savedEducationBackground = await educationBackground.save();

    res.status(201).json({
      success: true,
      message: "Academic qualification added successfully",
      academicQualifications: savedEducationBackground.academicQualifications,
    });
  } catch (err) {
    console.error("Error in addAcademicQualification:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get all academic qualifications for a specific resume
 */
export const getAcademicQualifications = async (req, res) => {
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exist");

  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });

  const host = `${req.protocol}://${req.get("host")}`;

  const academicQualifications =
    educationBackground?.academicQualifications.map((q) => {
      const qualification = q.toObject();

      // Convert stored filenames to full URLs
      ["certificate", "transcript"].forEach((field) => {
        if (qualification[field]) {
          qualification[field] = `${host}/uploads/${qualification[field]}`;
        } else {
          qualification[field] = null;
        }
      });

      return qualification;
    }) || [];

  res.status(200).json({
    success: true,
    message: "Academic qualifications retrieved successfully",
    academicQualifications,
  });
};

/**
 * Update a specific academic qualification by ID
 */
export const updateAcademicQualification = async (req, res) => {
  try {
    // Validate request body
    const { error } = updateAcademicQualificationBodySchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });

    // Ensure resume exists
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume doesn't exist");

    // Ensure education background exists
    const educationBackground = await EducationBackground.findOne({
      resume: resume._id,
    });
    if (!educationBackground)
      throw new NotFoundError("Education background doesn't exist");

    // Find the academic qualification to update
    const index = educationBackground.academicQualifications.findIndex((q) =>
      q._id.equals(req.params.id),
    );
    if (index === -1)
      throw new NotFoundError("Academic qualification doesn't exist");

    const qualification = educationBackground.academicQualifications[index];

    // Handle certificate upload
    if (req.files?.certificate?.[0]) {
      const file = req.files.certificate[0];
      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed for certificates",
        });
      }

      // Remove old file
      if (qualification.certificate) {
        const oldPath = path.join(
          __dirname,
          "../uploads/certificates",
          qualification.certificate,
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      qualification.certificate = file.filename;
    }

    // Handle transcript upload
    if (req.files?.transcript?.[0]) {
      const file = req.files.transcript[0];
      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed for transcripts",
        });
      }

      // Remove old file
      if (qualification.transcript) {
        const oldPath = path.join(
          __dirname,
          "../uploads/transcripts",
          qualification.transcript,
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      qualification.transcript = file.filename;
    }

    // Merge other validated fields
    qualification.set(req.body);

    // Save changes
    await educationBackground.save();

    res.status(200).json({
      success: true,
      message: "Academic qualification updated successfully",
      academicQualification: qualification.toObject(),
    });
  } catch (err) {
    console.error("Error in updateAcademicQualification:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Delete a specific academic qualification by ID
 */
export const deleteAcademicQualification = async (req, res) => {
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exist");

  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education background doesn't exist");

  const originalLength = educationBackground.academicQualifications.length;
  educationBackground.academicQualifications =
    educationBackground.academicQualifications.filter(
      (q) => !q._id.equals(req.params.id),
    );

  if (educationBackground.academicQualifications.length === originalLength)
    throw new NotFoundError("Academic qualification doesn't exist");

  await educationBackground.save();

  res.status(200).json({
    success: true,
    message: "Academic qualification deleted successfully",
  });
};
