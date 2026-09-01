import EducationBackground from "../../models/EducationBackground.model.js";
import { NotFoundError } from "../../utils/customErrors.util.js";

export const getSchoolQualifications = async (req, res) => {
  const { page = 1, limit = 25, level, award, schoolName } = req.query;

  const educations = await EducationBackground.find().populate(
    "resume",
    "_id title",
  );
  if (!educations) throw new NotFoundError("Education background not found");

  const results = [];
  educations.map((edu) => {
    edu.schoolQualifications.map((q) =>
      results.push({ ...q.toObject(), resume: edu.resume }),
    );
  });

  // Filters
  if (level) results = results.filter((s) => s.level === level);
  if (award) results = results.filter((s) => s.award === award);
  if (schoolName)
    results = results.filter((s) =>
      s.school.name.toLowerCase().includes(schoolName.toLowerCase()),
    );

  // Pagination
  const total = results.length;
  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginated = results.slice(start, end);

  return res.status(200).json({
    success: true,
    message: "School qualifications retrieved successfully",
    data: paginated,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

export const getSchoolQualification = async (req, res) => {
  const { id } = req.params;

  const education = await EducationBackground.findOne({
    "schoolQualifications._id": id,
  }).populate("resume", "_id title");

  if (!education) throw new NotFoundError("School qualification not found");

  const school = education.schoolQualifications.id(id);

  return res.status(200).json({
    success: true,
    message: "School qualification retrieved successfully",
    data: school,
  });
};

export const updateSchoolQualification = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const education = await EducationBackground.findOne({
    "schoolQualifications._id": id,
  });
  if (!education) throw new NotFoundError("School qualification not found");

  const school = education.schoolQualifications.id(id);

  if (req.file) {
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are allowed for certificate",
      });
    }
    updateData.certificate = req.file.filename;
  }
  Object.assign(school, updateData);

  await education.save();

  return res.status(200).json({
    success: true,
    message: "School qualification updated successfully",
    data: school,
  });
};

export const deleteSchoolQualification = async (req, res) => {
  const { id } = req.params;

  const education = await EducationBackground.findOne({
    "schoolQualifications._id": id,
  });
  if (!education) throw new NotFoundError("School qualification not found");

  const originalLength = education.schoolQualifications.length;
  education.schoolQualifications = education.schoolQualifications.filter(
    (ac) => !ac._id.equals(id),
  );

  if (education.schoolQualifications.length === originalLength)
    throw new NotFoundError("school qualification doesn't exist");

  await education.save();

  return res.status(200).json({
    success: true,
    message: "School qualification deleted successfully",
  });
};
