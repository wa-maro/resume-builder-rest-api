import Joi from "joi";

// regex for "MMM YYYY"
export const monthYearRegex =
  /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/;

// helper: parse "MMM YYYY" → Date
export const parseMonthYear = (val) => (val ? Date.parse(`01 ${val}`) : null);

// ---------------------- ADD ----------------------
export const addWorkExperienceBodySchema = Joi.object({
  company: Joi.object({
    name: Joi.string().trim().min(2).max(255).required().messages({
      "string.base": "Company name must be a valid string.",
      "string.empty": "Company name is required.",
      "string.min": "Company name must be at least 2 characters long.",
      "string.max": "Company name must be no longer than 255 characters.",
    }),
    location: Joi.string().trim().min(2).max(255).required().messages({
      "string.base": "Company location must be a valid string.",
      "string.empty": "Company location is required.",
      "string.min": "Company location must be at least 2 characters long.",
      "string.max": "Company location must be no longer than 255 characters.",
    }),
  }).required(),
  position: Joi.string().trim().required().messages({
    "string.base": "Position must be a text.",
    "string.empty": "Position is required.",
  }),
  responsibilities: Joi.string().trim().min(80).required().messages({
    "string.base": "Responsibilities must be a text.",
    "string.empty": "Responsibilities are required.",
    "string.min": "Responsibilities must be at least 80 characters long.",
  }),
  startDate: Joi.string().trim().pattern(monthYearRegex).required().messages({
    "string.base": "Start date must be a text.",
    "string.empty": "Start date is required.",
    "string.pattern.base":
      "Start date must be in MMM YYYY format (e.g., Jan 2024).",
  }),
  currentlyWorking: Joi.boolean().default(false),
  endDate: Joi.when("currentlyWorking", {
    is: true,
    then: Joi.string().allow("").optional(),
    otherwise: Joi.string().trim().pattern(monthYearRegex).required().messages({
      "string.base": "End date must be a text.",
      "string.empty": "End date is required if not currently working.",
      "string.pattern.base":
        "End date must be in MMM YYYY format (e.g., Jan 2024).",
    }),
  }),
}).custom((obj, helpers) => {
  // check startDate <= endDate if not currently working
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

// ---------------------- UPDATE ----------------------
export const updateWorkExperienceBodySchema = Joi.object({
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
