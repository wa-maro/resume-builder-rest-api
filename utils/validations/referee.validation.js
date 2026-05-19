import Joi from "joi";

export const addRefereeBodySchema = Joi.object({
  fullName: Joi.string().required().trim().messages({
    "string.base": "Name must be a text.",
    "string.empty": "Name is required.",
    "any.required": "Name is required.",
  }),
  position: Joi.string().required().trim().messages({
    "string.base": "Position must be a text.",
    "string.empty": "Position is required.",
    "any.required": "Position is required.",
  }),
  organization: Joi.string().required().trim().messages({
    "string.base": "Organization must be a text.",
    "string.empty": "Organization is required.",
    "any.required": "Organization is required.",
  }),
  physicalAddress: Joi.string().required().trim().messages({
    "string.base": "Address must be a text.",
    "string.empty": "Address is required.",
    "any.required": "Address is required.",
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
});

export const updateRefereeBodySchema = Joi.object({
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
