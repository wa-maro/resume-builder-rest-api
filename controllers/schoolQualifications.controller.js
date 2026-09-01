import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import EducationBackground from "../models/EducationBackground.model.js";
import Resume from "../models/Resume.model.js";
import { NotFoundError } from "../utils/customErrors.util.js";
import {
  addSchoolQualificationBodySchema,
  updateSchoolQualificationBodySchema,
} from "../utils/validations/education.validation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Add new school qualifications for a specific resume
 */
export const addSchoolQualifications = async (req, res) => {
  try {
    // Optional file validation
    if (req.file && req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed for certificates",
      });
    }

    // Validate request body (after normalizeBody middleware)
    const { error } = addSchoolQualificationBodySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Check if resume exists
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume doesn't exist");

    // Ensure EducationBackground exists
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

    // Check for existing qualification (by level)
    const existingIndex = educationBackground.schoolQualifications.findIndex(
      (q) => q.level === req.body.level,
    );

    let qualification;
    if (existingIndex !== -1) {
      // Update existing qualification
      qualification = {
        ...educationBackground.schoolQualifications[existingIndex].toObject(),
        ...req.body,
      };

      if (req.file) {
        qualification.certificate = req.file.filename; // update only if file uploaded
      }

      educationBackground.schoolQualifications[existingIndex] = qualification;
    } else {
      // Add new qualification
      qualification = {
        ...req.body,
      };

      if (req.file) {
        qualification.certificate = req.file.filename; // set only if file uploaded
      }

      educationBackground.schoolQualifications.push(qualification);
    }

    const savedEducationBackground = await educationBackground.save();

    return res.status(201).json({
      success: true,
      message:
        existingIndex !== -1
          ? "School qualification updated successfully"
          : "School qualification added successfully",
      schoolQualification: qualification,
      schoolQualifications: savedEducationBackground.schoolQualifications,
    });
  } catch (err) {
    console.error("Error in addSchoolQualifications:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get all school qualifications for a specific resume
 */
export const getSchoolQualifications = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume doesn't exist");

    const educationBackground = await EducationBackground.findOne({
      resume: resume._id,
    });

    const host = `${req.protocol}://${req.get("host")}`;

    const schoolQualifications =
      educationBackground?.schoolQualifications.map((q) => {
        const qualification = q.toObject();
        // Add full URL for certificate PDF
        qualification.certificate = qualification.certificate
          ? `${host}/uploads/${qualification.certificate}`
          : null;
        return qualification;
      }) || [];

    res.status(200).json({
      success: true,
      message: "School qualifications retrieved successfully",
      schoolQualifications,
    });
  } catch (err) {
    console.error("Error in getSchoolQualifications:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Update a specific school qualification by ID
 */

export const updateSchoolQualification = async (req, res) => {
  try {
    // Validate request body with Joi
    const { error } = updateSchoolQualificationBodySchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    // Ensure resume exists
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume) throw new NotFoundError("Resume doesn't exist");

    // Ensure education background exists
    const educationBackground = await EducationBackground.findOne({
      resume: resume._id,
    });
    if (!educationBackground)
      throw new NotFoundError("Education background doesn't exist");

    // Find the qualification to update
    const index = educationBackground.schoolQualifications.findIndex((q) =>
      q._id.equals(req.params.id),
    );
    if (index === -1)
      throw new NotFoundError("School qualification doesn't exist");

    const qualification = educationBackground.schoolQualifications[index];

    // Handle certificate (PDF only)
    if (req.file) {
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed for certificates",
        });
      }

      // Remove old certificate file if it exists
      if (qualification.certificate) {
        const oldFilePath = path.join(
          __dirname,
          "../uploads/certificates",
          qualification.certificate,
        );
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      qualification.certificate = req.file.filename;
    }

    // Merge validated updates from Joi (safe since Joi handles allowed fields)
    qualification.set(req.body);

    // Save changes
    await educationBackground.save();

    res.status(200).json({
      success: true,
      message: "School qualification updated successfully",
      schoolQualification: qualification.toObject(),
    });
  } catch (err) {
    console.error("Error in updateSchoolQualification:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Delete a specific school qualification by ID
 */
export const deleteSchoolQualification = async (req, res) => {
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exist");

  const educationBackground = await EducationBackground.findOne({
    resume: resume._id,
  });
  if (!educationBackground)
    throw new NotFoundError("Education background doesn't exist");

  const originalLength = educationBackground.schoolQualifications.length;
  educationBackground.schoolQualifications =
    educationBackground.schoolQualifications.filter(
      (q) => !q._id.equals(req.params.id),
    );

  if (educationBackground.schoolQualifications.length === originalLength)
    throw new NotFoundError("School qualification doesn't exist");

  await educationBackground.save();

  res.status(200).json({
    success: true,
    message: "School qualification deleted successfully",
  });
};
