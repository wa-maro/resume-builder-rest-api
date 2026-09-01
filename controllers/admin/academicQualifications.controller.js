import EducationBackground from "../../models/EducationBackground.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

export const getAcademicQualifications = async (req, res) => {
  const { page = 1, limit = 25, level, award, institutionName } = req.query;

  const educations = await EducationBackground.find().populate(
    "resume",
    "_id title",
  );
  if (!educations) throw new NotFoundError("Education background not found");

  const results = [];
  educations.map((edu) =>
    edu.academicQualifications.map((q) =>
      results.push({ ...q.toObject(), resume: edu.resume }),
    ),
  );

  // Filters
  if (level) results = results.filter((a) => a.level === level);
  if (award) results = results.filter((a) => a.award === award);
  if (institutionName)
    results = results.filter((a) =>
      a.institution.name.toLowerCase().includes(institutionName.toLowerCase()),
    );

  // Pagination
  const total = results.length;
  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginated = results.slice(start, end);

  return res.status(200).json({
    success: true,
    message: "Academic qualifications retrieved successfully",
    data: paginated,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

export const getAcademicQualification = async (req, res) => {
  const { id } = req.params;

  const education = await EducationBackground.findOne({
    "academicQualifications._id": id,
  }).populate("resume", "_id title");
  if (!education) throw new NotFoundError("Academic qualification not found");

  const academic = education.academicQualifications.id(id);

  return res.status(200).json({
    success: true,
    message: "Academic qualification retrieved successfully",
    data: academic,
  });
};

import fs from "fs";
import path from "path";

export const updateAcademicQualification = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const education = await EducationBackground.findOne({
    "academicQualifications._id": id,
  });
  if (!education) throw new NotFoundError("Academic qualification not found");

  const academic = education.academicQualifications.id(id);

  // Handle certificate upload
  if (req.files?.certificate?.[0]) {
    const file = req.files.certificate[0];
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed for certificates",
      });
    }

    // Remove old file if exists
    if (academic.certificate) {
      const oldPath = path.join(
        __dirname,
        "../uploads/certificates",
        academic.certificate,
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    academic.certificate = file.filename;
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

    // Remove old file if exists
    if (academic.transcript) {
      const oldPath = path.join(
        __dirname,
        "../uploads/transcripts",
        academic.transcript,
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    academic.transcript = file.filename;
  }

  // Update other fields
  Object.assign(academic, updateData);

  await education.save();

  return res.status(200).json({
    success: true,
    message: "Academic qualification updated successfully",
    data: academic,
  });
};

export const deleteAcademicQualification = async (req, res) => {
  const { id } = req.params;

  const education = await EducationBackground.findOne({
    "academicQualifications._id": id,
  });
  if (!education) throw new NotFoundError("Academic qualification not found");

  const originalLength = education.academicQualifications.length;
  education.academicQualifications = education.academicQualifications.filter(
    (ac) => !ac._id.equals(id),
  );

  if (education.academicQualifications.length === originalLength)
    throw new NotFoundError("Academic qualification doesn't exist");

  await education.save();

  return res.status(200).json({
    success: true,
    message: "Academic qualification deleted successfully",
  });
};
