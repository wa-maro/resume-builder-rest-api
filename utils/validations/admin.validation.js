import Joi from "joi";
import { monthYearRegex, parseMonthYear } from "./workExperience.validation.js";
import {
  academicGradeSchema,
  schoolGradeSchema,
} from "./education.validation.js";

export const EditUserBodySchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).messages({
    "string.base": "Username must be a text.",
    "string.empty": "Username cannot be empty.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must not exceed 30 characters.",
  }),
  email: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
    .messages({
      "string.base": "Email must be a text.",
      "string.empty": "Email cannot be empty.",
      "string.pattern.base": "Please provide a valid email address.",
    }),
  role: Joi.string().valid("user", "admin").messages({
    "any.only": "Role must be either 'user' or 'admin'.",
    "string.base": "Role must be a text.",
    "string.empty": "Role cannot be empty.",
  }),
  isActive: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

export const EditResumeBodySchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    "string.base": "Title must be a text.",
  }),
  summary: Joi.string().trim().optional().messages({
    "string.base": "Summary must be a text.",
  }),
  declaration: Joi.object({
    statement: Joi.string().optional().trim().messages({
      "string.base": "Statement must be a text.",
    }),
    signature: Joi.string().optional().trim().messages({
      "string.base": "Signature must be a text.",
    }),
    date: Joi.string()
      .optional()
      .trim()
      .pattern(/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/)
      .messages({
        "string.pattern.base": "Date must be in DD/MM/YYYY format.",
      }),
  }).optional(),
  isActive: Joi.boolean().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update.",
  });

export const editPersonalInfoBodySchema = Joi.object({
  fullName: Joi.string().optional().trim().messages({
    "string.base": "Full name must be a text.",
  }),
  gender: Joi.string().valid("male", "female").optional().trim().messages({
    "any.only": "Gender must be either 'male' or 'female'.",
    "string.base": "Gender must be a text.",
  }),
  dateOfBirth: Joi.string()
    .optional()
    .trim()
    .pattern(/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/)
    .messages({
      "string.base": "Birthdate must be a text.",
      "string.pattern.base": "Date must be in DD/MM/YYYY format.",
    }),
  nationality: Joi.string().optional().trim().messages({
    "string.base": "Nationality must be a text.",
  }),
  placeOfDomicile: Joi.string().trim().messages({
    "string.base": "Place of Domicile must be a text.",
  }),
  maritualStatus: Joi.string()
    .valid("single", "married", "divorced", "widowed")
    .optional()
    .trim()
    .messages({
      "string.base": "Maritual status must be a text.",
      "any.only":
        "Maritual status must be one of: single, married, divorced, widowed.",
    }),
  disabilities: Joi.array()
    .items(
      Joi.string().valid(
        "none",
        "visual",
        "hearing",
        "mobility",
        "cognitive",
        "other",
      ),
    )
    .custom((value, helpers) => {
      if (value.includes("none") && value.length > 1) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid":
        "If 'none' is selected, no other disabilities can be selected.",
      "array.base": "Disabilities must be a list of strings.",
    }),
  email: Joi.string()
    .optional()
    .trim()
    .lowercase()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
    .messages({
      "string.base": "Email must be a text.",
      "string.pattern.base": "Please provide a valid email address.",
    }),
  phone: Joi.string()
    .optional()
    .trim()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.base": "Phone must be a text.",
      "string.pattern.base":
        "Phone number must be valid (7–15 digits, optional + at start).",
    }),
  physicalAddress: Joi.string().optional().trim().messages({
    "string.base": "Address must be a text.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });

export const editSchoolQualificationBodySchema = Joi.object({
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
      "Advanced Certificate of Secondary Education Examination (ACSEE)",
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

export const editAcademicQualificationBodySchema = Joi.object({
  level: Joi.string()
    .optional()
    .valid(
      "Diploma",
      "Advanced Diploma",
      "Bachelor's",
      "Postgraduate Diploma",
      "Master's",
      "Doctorate (PhD)",
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

export const editProjectBodySchema = Joi.object({
  title: Joi.string().min(2).max(100).optional().messages({
    "string.base": "Project title must be text",
    "string.min": "Project title should have at least 2 characters",
  }),
  description: Joi.string().min(50).max(1000).optional().messages({
    "string.min": "Description should have at least 10 characters",
  }),
  socialLinks: Joi.array()
    .items(
      Joi.string().optional().uri().messages({
        "string.uri": "Link must be a valid URL",
      }),
    )
    .optional()
    .unique()
    .messages({
      "array.unique": "Social links must be unique",
    }),
  tools: Joi.array()
    .items(Joi.string().optional().min(1))
    .optional()
    .unique()
    .messages({
      "array.unique": "Tools must be unique",
    }),
});

export const editWorkExperienceBodySchema = Joi.object({
  company: Joi.object({
    name: Joi.string().trim().min(2).max(255).messages({
      "string.base": "Company name must be a valid string.",
      "string.min": "Company name must be at least 2 characters long.",
      "string.max": "Company name must be no longer than 255 characters.",
    }),
    location: Joi.string().trim().min(2).max(255).messages({
      "string.base": "Company location must be a valid string.",
      "string.min": "Company location must be at least 2 characters long.",
      "string.max": "Company location must be no longer than 255 characters.",
    }),
  }).optional(),
  position: Joi.string().trim().messages({
    "string.base": "Position must be a text.",
  }),
  responsibilities: Joi.string().trim().min(80).messages({
    "string.base": "Responsibilities must be a text.",
    "string.min": "Responsibilities must be at least 80 characters long.",
  }),
  startDate: Joi.string().trim().pattern(monthYearRegex).messages({
    "string.base": "Start date must be a text.",
    "string.pattern.base":
      "Start date must be in MMM YYYY format (e.g., Jan 2024).",
  }),
  currentlyWorking: Joi.boolean(),
  endDate: Joi.alternatives().conditional("currentlyWorking", {
    is: true,
    then: Joi.string().allow("").optional(),
    otherwise: Joi.string().trim().pattern(monthYearRegex).messages({
      "string.base": "End date must be a text.",
      "string.pattern.base":
        "End date must be in MMM YYYY format (e.g., Jan 2024).",
    }),
  }),
})
  .min(1)
  .messages({ "object.min": "At least one field must be provided to update." })
  .custom((obj, helpers) => {
    if (!obj.currentlyWorking && obj.startDate && obj.endDate) {
      const start = parseMonthYear(obj.startDate);
      const end = parseMonthYear(obj.endDate);
      if (isNaN(start) || isNaN(end)) {
        return helpers.error("any.invalid", {
          message: "Invalid date format. Use MMM YYYY (e.g., Jan 2024).",
        });
      }
      if (start > end) {
        return helpers.error("any.invalid", {
          message: "Start date must be before or equal to end date.",
        });
      }
    }
    return obj;
  });

export const editSkillBodySchema = Joi.object({
  category: Joi.string()
    .optional()
    .valid("personal", "professional")
    .trim()
    .messages({
      "string.base": "Category must be a text.",
      "any.only": "Category must be one of: personal, professional.",
    }),
  name: Joi.string().optional().trim().messages({
    "string.base": "Skill name must be a text.",
  }),
  description: Joi.string().optional().allow("").trim().messages({
    "string.base": "Description must be a text.",
  }),
  proficiency: Joi.number().optional().min(0).max(100).messages({
    "number.base": "Proficiency must be a number.",
  }),
});

export const editRefereeBodySchema = Joi.object({
  fullName: Joi.string().trim().messages({
    "string.base": "Name must be a text.",
  }),
  position: Joi.string().trim().messages({
    "string.base": "Position must be a text.",
  }),
  organization: Joi.string().trim().messages({
    "string.base": "Organization must be a text.",
  }),
  physicalAddress: Joi.string().trim().messages({
    "string.base": "Address must be a text.",
  }),
  email: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
    .messages({
      "string.base": "Email must be a text.",
      "string.pattern.base": "Please provide a valid email address.",
    }),
  phone: Joi.string()
    .trim()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.base": "Phone must be a text.",
      "string.pattern.base":
        "Phone number must be valid (7–15 digits, optional + at start).",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });
