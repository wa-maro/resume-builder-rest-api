import Joi from "joi";

export const addSkillBodySchema = Joi.object({
  category: Joi.string()
    .required()
    .valid("personal", "professional")
    .trim()
    .messages({
      "string.base": "Category must be a text.",
      "string.empty": "Category is required.",
      "any.required": "Category is required.",
      "any.only": "Category must be one of: personal, professional.",
    }),
  name: Joi.string().required().trim().messages({
    "string.base": "Skill name must be a text.",
    "string.empty": "Skill name is required.",
    "any.required": "Skill name is required.",
  }),
  description: Joi.string().optional().allow("").trim().messages({
    "string.base": "Description must be a text.",
  }),
  proficiency: Joi.number().min(0).max(100).messages({
    "number.base": "Proficiency must be a number.",
  }),
});

export const updateSkillBodySchema = Joi.object({
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
