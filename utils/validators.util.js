import Joi from "joi";

export const createResumeBodySchema = Joi.object({
  title: Joi.string().optional().trim().messages({
    "string.base": "Title must be a text.",
    "string.empty": "Title is required.",
  }),
  summary: Joi.string().optional().trim().allow("").messages({
    "string.base": "Summary must be a text.",
    "string.empty": "Summary is required.",
  }),
  declaration: {
    statement: Joi.string().optional().trim().messages({
      "string.base": "Statement must be a text.",
      "string.empty": "Statement is required.",
    }),
    signature: Joi.string().optional().trim().messages({
      "string.base": "Signature must be a text.",
      "string.empty": "Signature is required.",
    }),
    date: Joi.string()
      .optional()
      .trim()
      .pattern(/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/)
      .messages({
        "string.pattern.base": "Date must be in DD/MM/YYYY format.",
        "string.empty": "Date is required.",
      }),
  },
});

export const updateResumeBodySchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    "string.base": "Title must be a text.",
  }),
  summary: Joi.string().trim().optional().messages({
    "string.base": "Summary must be a text.",
  }),
  declaration: {
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
  },
});
