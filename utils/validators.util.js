import Joi from "joi";
import mongoose from "mongoose";

export const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const paramsWithIDsSchema = Joi.object({
  resumeId: Joi.string().custom(objectId).messages({
    "string.base": "ID must be a string",
    "any.invalid": "ID must be a valid ObjectId",
  }),
  id: Joi.string().custom(objectId).messages({
    "string.base": "ID must be a string",
    "any.invalid": "ID must be a valid ObjectId",
  }),
}).or("id", "resumeId");

export const createResumeBodySchema = Joi.object({
  title: Joi.string().optional().trim().messages({
    "string.base": "Title must be a text.",
    "string.empty": "Title is required.",
  }),
  summary: Joi.string().optional().trim().allow("").messages({
    "string.base": "Summary must be a text.",
    "string.empty": "Summary is required.",
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
  }),
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
