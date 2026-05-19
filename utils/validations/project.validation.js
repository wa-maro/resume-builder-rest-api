import Joi from "joi";

export const addProjectBodySchema = Joi.object({
  title: Joi.string().min(2).max(100).required().messages({
    "string.base": "Project title must be text",
    "string.empty": "Project title is required",
    "string.min": "Project title should have at least 2 characters",
  }),
  description: Joi.string().min(50).max(1000).required().messages({
    "string.empty": "Project description is required",
    "string.min": "Description should have at least 50 characters",
  }),
  socialLinks: Joi.array()
    .items(
      Joi.string().uri().messages({
        "string.uri": "Link must be a valid URL",
      })
    )
    .unique()
    .messages({
      "array.unique": "Social links must be unique",
    }),
  tools: Joi.array().items(Joi.string().min(1)).unique().messages({
    "array.unique": "Tools must be unique",
  }),
});

export const updateProjectBodySchema = Joi.object({
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
      })
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
