import Joi from "joi";

// ==========================
// Create FAQ Validation
// ==========================
export const createFAQSchema = Joi.object({
  question: Joi.string().trim().required().messages({
    "string.base": "Question must be a string",
    "string.empty": "Question cannot be empty",
    "any.required": "Question is required",
  }),
  answer: Joi.string().trim().required().messages({
    "string.base": "Answer must be a string",
    "string.empty": "Answer cannot be empty",
    "any.required": "Answer is required",
  }),
  order: Joi.number().integer().min(0).optional().messages({
    "number.base": "Order must be a number",
    "number.integer": "Order must be an integer",
    "number.min": "Order cannot be negative",
  }),
  isActive: Joi.boolean().optional(),
});

// ==========================
// Update FAQ Validation
// ==========================
export const updateFAQSchema = Joi.object({
  question: Joi.string().trim().optional(),
  answer: Joi.string().trim().optional(),
  order: Joi.number().integer().min(0).optional(),
  isActive: Joi.boolean().optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
