import Joi from "joi";

/**
 * School Qualification Grade Schema
 */
export const schoolGradeSchema = Joi.object({
  division: Joi.string()
    .valid("I", "II", "III", "IV", "0")
    .optional()
    .messages({
      "any.only": "Division must be one of: I, II, III, IV, 0.",
    }),
  points: Joi.number().min(0).optional().messages({
    "number.base": "Points must be a valid number.",
    "number.min": "Points cannot be negative.",
  }),
});

/**
 * Add School Qualification Schema
 */
export const addSchoolQualificationBodySchema = Joi.object({
  level: Joi.string()
    .valid("Primary", "O-Level", "A-Level")
    .required()
    .messages({
      "any.required": "Level is required.",
      "any.only": "Level must be one of: Primary, O-Level, A-Level.",
    }),
  award: Joi.string()
    .valid(
      "Primary School Leaving Examination (PSLE)",
      "The Certificate of Secondary Education Examination (CSEE)",
      "Advanced Certificate of Secondary Education Examination (ACSEE)"
    )
    .required()
    .messages({
      "any.required": "Award is required.",
      "any.only": "Award must be one of: PSLE, CSEE, or ACSEE.",
    }),
  school: Joi.object({
    name: Joi.string().trim().min(2).max(255).required().messages({
      "string.base": "School name must be a valid string.",
      "string.min": "School name must be at least 2 characters long.",
      "string.max": "School name must be no longer than 255 characters.",
    }),
    location: Joi.string().trim().min(2).max(255).required().messages({
      "string.base": "School location must be a valid string.",
      "string.min": "School location must be at least 2 characters long.",
      "string.max": "School location must be no longer than 255 characters.",
    }),
  }).required(),
  startYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "Start year must be a valid number.",
      "number.min": "Start year cannot be before 1900.",
      "number.max": `Start year cannot be after ${new Date().getFullYear()}.`,
      "any.required": "Start year is required.",
    }),
  endYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .required()
    .custom((value, helpers) => {
      const { startYear } = helpers?.state?.ancestors[0];
      if (startYear && value < startYear) {
        return helpers.message("End year must be equal to or after Start year");
      }
      return value;
    })
    .messages({
      "number.base": "End year must be a valid number.",
      "number.min": "End year cannot be before 1900.",
      "number.max": `End year cannot be after ${
        new Date().getFullYear() + 10
      }.`,
      "any.required": "End year is required.",
    }),
  grade: schoolGradeSchema.optional(),
});

/**
 * Update School Qualification Schema
 */
export const updateSchoolQualificationBodySchema = Joi.object({
  level: Joi.string()
    .optional()
    .valid("Primary", "O-Level", "A-Level")
    .messages({
      "any.only": "Level must be one of: Primary, O-Level, A-Level.",
    }),
  award: Joi.string()
    .optional()
    .valid(
      "Primary School Leaving Examination (PSLE)",
      "The Certificate of Secondary Education Examination (CSEE)",
      "Advanced Certificate of Secondary Education Examination (ACSEE)"
    )
    .messages({
      "any.only": "Award must be one of: PSLE, CSEE, ACSEE.",
    }),
  school: Joi.object({
    name: Joi.string().optional().trim().min(2).max(255).messages({
      "string.base": "School name must be a valid string.",
      "string.min": "School name must be at least 2 characters long.",
      "string.max": "School name must be no longer than 255 characters.",
    }),
    location: Joi.string().optional().trim().min(2).max(255).messages({
      "string.base": "School location must be a valid string.",
      "string.min": "School location must be at least 2 characters long.",
      "string.max": "School location must be no longer than 255 characters.",
    }),
  }).optional(),
  startYear: Joi.number()
    .integer()
    .optional()
    .min(1900)
    .max(new Date().getFullYear())
    .messages({
      "number.base": "Start year must be a valid number.",
      "number.min": "Start year cannot be before 1900.",
      "number.max": `Start year cannot be after ${new Date().getFullYear()}.`,
    }),
  endYear: Joi.number()
    .optional()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .custom((value, helpers) => {
      const { startYear } = helpers?.state?.ancestors[0];
      if (startYear && value < startYear) {
        return helpers.message("End year must be equal to or after Start year");
      }
      return value;
    })
    .messages({
      "number.base": "End year must be a valid number.",
      "number.min": "End year cannot be before 1900.",
      "number.max": `End year cannot be after ${
        new Date().getFullYear() + 10
      }.`,
    }),
  grade: schoolGradeSchema.optional(),
}).optional();

/**
 * Academic Qualification Grade Schema
 */
export const academicGradeSchema = Joi.object({
  classification: Joi.string()
    .valid("First Class", "Upper Second", "Lower Second", "Pass", "Fail")
    .required()
    .messages({
      "any.required": "Classification is required.",
      "any.only":
        "Classification must be one of: First Class, Upper Second, Lower Second, Pass, Fail.",
    }),
  gpa: Joi.number().min(0).max(5).required().messages({
    "any.required": "GPA is required.",
    "number.base": "GPA must be a valid number.",
    "number.min": "GPA cannot be less than 0.",
    "number.max": "GPA cannot be more than 5.",
  }),
});

/**
 * Add Academic Qualification Schema
 */
export const addAcademicQualificationBodySchema = Joi.object({
  level: Joi.string()
    .valid(
      "Diploma",
      "Advanced Diploma",
      "Bachelor's",
      "Postgraduate Diploma",
      "Master's",
      "Doctorate (PhD)"
    )
    .required()
    .messages({
      "any.required": "Level is required.",
      "any.only":
        "Level must be one of: Diploma, Advanced Diploma, Bachelor's, Postgraduate Diploma, Master's, Doctorate (PhD).",
    }),
  award: Joi.string().trim().required().messages({
    "string.base": "Award must be a valid string.",
    "any.required": "Award is required.",
  }),
  institution: Joi.object({
    name: Joi.string().trim().min(2).max(255).required().messages({
      "string.base": "Institution name must be a valid string.",
      "string.min": "Institution name must be at least 2 characters long.",
      "string.max": "Institution name must be no longer than 255 characters.",
    }),
    location: Joi.string().trim().min(2).max(255).required().messages({
      "string.base": "Institution location must be a valid string.",
      "string.min": "Institution location must be at least 2 characters long.",
      "string.max":
        "Institution location must be no longer than 255 characters.",
    }),
  }).required(),
  startYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.base": "Start year must be a valid number.",
      "number.min": "Start year cannot be before 1900.",
      "number.max": `Start year cannot be after ${new Date().getFullYear()}.`,
      "any.required": "Start year is required.",
    }),
  endYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .required()
    .custom((value, helpers) => {
      const { startYear } = helpers?.state?.ancestors[0];
      if (startYear && value < startYear) {
        return helpers.message("End year must be equal to or after Start year");
      }
      return value;
    })
    .messages({
      "number.base": "End year must be a valid number.",
      "number.min": "End year cannot be before 1900.",
      "number.max": `End year cannot be after ${
        new Date().getFullYear() + 10
      }.`,
      "any.required": "End year is required.",
    }),
  grade: academicGradeSchema.required(),
});

/**
 * Update Academic Qualification Schema
 * - Nested `institution` object
 * - Partial updates allowed
 */
export const updateAcademicQualificationBodySchema = Joi.object({
  level: Joi.string()
    .optional()
    .valid(
      "Diploma",
      "Advanced Diploma",
      "Bachelor's",
      "Postgraduate Diploma",
      "Master's",
      "Doctorate (PhD)"
    )
    .messages({
      "any.only":
        "Level must be one of: Diploma, Advanced Diploma, Bachelor's, Postgraduate Diploma, Master's, Doctorate (PhD).",
    }),
  award: Joi.string().optional().trim().messages({
    "string.base": "Award must be a valid string.",
  }),
  institution: Joi.object({
    name: Joi.string().optional().trim().min(2).max(255).messages({
      "string.base": "Institution name must be a valid string.",
      "string.min": "Institution name must be at least 2 characters long.",
      "string.max": "Institution name must be no longer than 255 characters.",
    }),
    location: Joi.string().optional().trim().min(2).max(255).messages({
      "string.base": "Institution location must be a valid string.",
      "string.min": "Institution location must be at least 2 characters long.",
      "string.max":
        "Institution location must be no longer than 255 characters.",
    }),
  }).optional(),
  startYear: Joi.number()
    .integer()
    .optional()
    .min(1900)
    .max(new Date().getFullYear())
    .messages({
      "number.base": "Start year must be a valid number.",
      "number.min": "Start year cannot be before 1900.",
      "number.max": `Start year cannot be after ${new Date().getFullYear()}.`,
    }),
  endYear: Joi.number()
    .integer()
    .optional()
    .min(1900)
    .max(new Date().getFullYear() + 10)
    .custom((value, helpers) => {
      const { startYear } = helpers?.state?.ancestors[0];
      if (startYear && value < startYear) {
        return helpers.message("End year must be equal to or after Start year");
      }
      return value;
    })
    .messages({
      "number.base": "End year must be a valid number.",
      "number.min": "End year cannot be before 1900.",
      "number.max": `End year cannot be after ${
        new Date().getFullYear() + 10
      }.`,
    }),
  grade: academicGradeSchema.optional(),
}).optional();
