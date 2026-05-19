/**
 * Normalize incoming request body.
 * - Parses stringified JSON fields (e.g. school, grade).
 * - Converts numeric fields to numbers (startYear, endYear, grade.points).
 */
export const normalizeSchoolBody = (req, res, next) => {
  // parse school if it comes as string
  if (req.body.school && typeof req.body.school === "string") {
    try {
      req.body.school = JSON.parse(req.body.school);
    } catch (err) {
      return res.status(400).json({ error: "Invalid school format" });
    }
  }

  // Parse grade if it’s a JSON string
  if (req.body.grade && typeof req.body.grade === "string") {
    try {
      req.body.grade = JSON.parse(req.body.grade);
    } catch (err) {
      return res.status(400).json({ error: "Invalid grade format" });
    }
  }

  // convert years from string → number
  if (req.body.startYear) {
    req.body.startYear = Number(req.body.startYear);
  }
  if (req.body.endYear) {
    req.body.endYear = Number(req.body.endYear);
  }

  next();
};

export const normalizeResumeBody = (req, res, next) => {
  if (req.body.declaration && typeof req.body.declaration === "string") {
    try {
      req.body.declaration = JSON.parse(req.body.declaration);
    } catch (err) {
      return res.status(400).json({ error: "Invalid declaration format" });
    }
  }

  next();
};

export const normalizeAcademicBody = (req, res, next) => {
  let institution;
  if (req.body.institution && typeof req.body.institution === "string") {
    try {
      institution = JSON.parse(req.body.institution);
    } catch {
      return res.status(400).json({ error: "Invalid institution format" });
    }
  } else if (req.body.institutionName || req.body.institutionLocation) {
    institution = {
      name: req.body.institutionName,
      location: req.body.institutionLocation,
    };
  }

  let grade;
  if (req.body.grade && typeof req.body.grade === "string") {
    try {
      grade = JSON.parse(req.body.grade);
    } catch {
      return res.status(400).json({ error: "Invalid grade format" });
    }
  } else if (req.body.gradeClassification || req.body.gradeGPA) {
    grade = {
      classification: req.body.gradeClassification,
      gpa: req.body.gradeGPA ? parseFloat(req.body.gradeGPA) : undefined,
    };
  }

  // convert years
  if (req.body.startYear) req.body.startYear = Number(req.body.startYear);
  if (req.body.endYear) req.body.endYear = Number(req.body.endYear);

  // Assign normalized objects
  if (institution) req.body.institution = institution;
  if (grade) req.body.grade = grade;

  // cleanup flattened keys
  delete req.body.institutionName;
  delete req.body.institutionLocation;
  delete req.body.gradeClassification;
  delete req.body.gradeGPA;

  next();
};

export const normalizeProjectBody = (req, res, next) => {
  if (req.body.tools) {
    req.body.tools = req.body.tools.split(",").map((t) => t.trim());
  }
  if (req.body.socialLinks) {
    req.body.socialLinks = req.body.socialLinks.split(",").map((s) => s.trim());
  }

  next();
};

/**
 * Normalize FormData body for Skill endpoints.
 * - Converts numeric fields (proficiency) to number.
 * - Leaves certificate as-is (File handled by multer).
 * - Trims optional strings (description, name, category).
 */
export default function skillNormalizeBody(req, res, next) {
  const body = req.body;
  if (!body) return next();

  // Convert numeric fields
  if (body.proficiency && !isNaN(body.proficiency)) {
    body.proficiency = Number(body.proficiency);
  }

  // Trim string fields
  if (body.name) body.name = body.name.trim();
  if (body.category) body.category = body.category.trim();
  if (body.description) body.description = body.description.trim();

  // certificate is handled by multer (req.file), leave as-is

  req.body = body;
  next();
}
