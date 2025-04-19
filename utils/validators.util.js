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

export const addPersonalDetailBodySchema = Joi.object({
  fullName: Joi.string().optional().trim().messages({
    "string.base": "Full name must be a text.",
    "string.empty": "Full name is required.",
  }),
  email: Joi.string()
    .optional()
    .trim()
    .lowercase()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
    .messages({
      "string.base": "Email must be a text.",
      "string.empty": "Email is required.",
      "string.pattern.base": "Please provide a valid email address.",
    }),
  phone: Joi.string()
    .optional()
    .trim()
    .pattern(/^\+?[0-9]{7,15}$/)
    .messages({
      "string.base": "Phone must be a text.",
      "string.empty": "Phone is required.",
      "string.pattern.base":
        "Phone number must be valid (7–15 digits, optional + at start).",
    }),
  address: Joi.string().optional().trim().messages({
    "string.base": "Address must be a text.",
    "string.empty": "Address is required.",
  }),
  gender: Joi.string().valid("Male", "Female").optional().trim().messages({
    "any.only": "Gender must be either 'Male' or 'Female'.",
    "string.base": "Gender must be a text.",
    "string.empty": "Gender is required.",
  }),
  nationality: Joi.string().optional().trim().messages({
    "string.base": "Nationality must be a text.",
  }),
  dateOfBirth: Joi.string()
    .optional()
    .trim()
    .pattern(/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/)
    .messages({
      "string.base": "Birthdate must be a text.",
      "string.empty": "Birthdate is required.",
      "string.pattern.base": "Date must be in DD/MM/YYYY format.",
    }),
  maritualStatus: Joi.string()
    .valid("Single", "Married", "Divorced", "Widowed")
    .optional()
    .trim()
    .messages({
      "string.base": "Maritual status must be a text.",
      "any.only":
        "Maritual status must be one of: Single, Married, Divorced, Widowed.",
    }),
  socialLinks: Joi.object({
    linkedIn: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
    facebook: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
    x: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
    github: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
  }).optional(),
});

export const updatePersonalDetailBodySchema = Joi.object({
  fullName: Joi.string().optional().trim().messages({
    "string.base": "Full name must be a text.",
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
  address: Joi.string().optional().trim().messages({
    "string.base": "Address must be a text.",
  }),
  gender: Joi.string().valid("Male", "Female").optional().trim().messages({
    "any.only": "Gender must be either 'Male' or 'Female'.",
    "string.base": "Gender must be a text.",
  }),
  nationality: Joi.string().optional().trim().messages({
    "string.base": "Nationality must be a text.",
  }),
  dateOfBirth: Joi.string()
    .optional()
    .trim()
    .pattern(/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/)
    .messages({
      "string.base": "Birthdate must be a text.",
      "string.pattern.base": "Date must be in DD/MM/YYYY format.",
    }),
  maritualStatus: Joi.string()
    .valid("Single", "Married", "Divorced", "Widowed")
    .optional()
    .trim()
    .messages({
      "string.base": "Maritual status must be a text.",
      "any.only":
        "Maritual status must be one of: Single, Married, Divorced, Widowed.",
    }),
  socialLinks: Joi.object({
    linkedIn: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
    facebook: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
    x: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
    github: Joi.string().optional().trim().messages({
      "string.base": "Social link must be a text.",
    }),
  }).optional(),
});
