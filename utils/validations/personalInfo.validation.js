import Joi from "joi";

export const addPersonalInfoBodySchema = Joi.object({
  fullName: Joi.string().required().trim().messages({
    "string.base": "Full name must be a text.",
    "string.empty": "Full name is required.",
  }),
  gender: Joi.string().valid("male", "female").required().trim().messages({
    "any.only": "Gender must be either 'male' or 'female'.",
    "string.base": "Gender must be a text.",
    "string.empty": "Gender is required.",
  }),
  dateOfBirth: Joi.string()
    .required()
    .trim()
    .pattern(/^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/)
    .messages({
      "string.base": "Birthdate must be a text.",
      "string.empty": "Birthdate is required.",
      "string.pattern.base": "Date must be in DD/MM/YYYY format.",
    }),
  nationality: Joi.string().required().trim().messages({
    "string.base": "Nationality must be a text.",
    "string.empty": "Nationality is required.",
  }),
  placeOfDomicile: Joi.string().optional().trim().messages({
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
        "other"
      )
    )
    .default(["none"])
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
  physicalAddress: Joi.string().required().trim().messages({
    "string.base": "Address must be a text.",
    "string.empty": "Address is required.",
  }),
});

export const updatePersonalInfoBodySchema = Joi.object({
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
        "other"
      )
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
