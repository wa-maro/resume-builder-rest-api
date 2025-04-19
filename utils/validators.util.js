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
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
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
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });

export const addSkillBodySchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.base": "Skill name must be a text.",
    "string.empty": "Skill name is required.",
    "any.required": "Skill name is required.",
  }),
  description: Joi.string().optional().allow("").trim().messages({
    "string.base": "Description must be a text.",
  }),
  proficiency: Joi.string()
    .required()
    .valid("beginner", "intermediate", "advanced", "expert")
    .trim()
    .messages({
      "string.base": "Proficiency must be a text.",
      "string.empty": "Proficiency is required.",
      "any.required": "Proficiency is required.",
      "any.only":
        "Proficiency must be one of: beginner, intermediate, advanced, expert.",
    }),
  certification: Joi.string().optional().allow("").trim().messages({
    "string.base": "Certification must be a text.",
  }),
});

export const updateSkillBodySchema = Joi.object({
  name: Joi.string().optional().trim().messages({
    "string.base": "Skill name must be a text.",
  }),
  description: Joi.string().optional().allow("").trim().messages({
    "string.base": "Description must be a text.",
  }),
  proficiency: Joi.string()
    .optional()
    .valid("beginner", "intermediate", "advanced", "expert")
    .trim()
    .messages({
      "string.base": "Proficiency must be a text.",
      "any.only":
        "Proficiency must be one of: beginner, intermediate, advanced, expert.",
    }),
  certification: Joi.string().optional().allow("").trim().messages({
    "string.base": "Certification must be a text.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });

export const addWorkExperienceBodySchema = Joi.object({
  company: Joi.string().required().trim().messages({
    "string.base": "Company name must be a text.",
    "string.empty": "Company name is required.",
    "any.required": "Company name is required.",
  }),
  position: Joi.string().required().trim().messages({
    "string.base": "Position must be a text.",
    "string.empty": "Position is required.",
    "any.required": "Position is required.",
  }),
  responsibilities: Joi.string().required().trim().min(80).messages({
    "string.base": "Responsibilities must be a text.",
    "string.empty": "Responsibilities are required.",
    "string.min": "Responsibilities must be at least 80 characters long.",
    "any.required": "Responsibilities are required.",
  }),
  startDate: Joi.string()
    .required()
    .trim()
    .pattern(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/)
    .messages({
      "string.base": "Start date must be a text.",
      "string.empty": "Start date is required.",
      "any.required": "Start date is required.",
      "string.pattern.base":
        'Start date must be in "MMM YYYY" format (e.g., Jan 2023).',
    }),
  currentlyWorking: Joi.boolean().default(false).messages({
    "boolean.base": "Currently working must be true or false.",
  }),
  endDate: Joi.alternatives().conditional("currentlyWorking", {
    is: false,
    then: Joi.string()
      .required()
      .trim()
      .pattern(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/)
      .messages({
        "string.base": "End date must be a text.",
        "string.empty": "End date is required if not currently working.",
        "string.pattern.base":
          'End date must be in "MMM YYYY" format (e.g., Jan 2023).',
        "any.required": "End date is required if not currently working.",
      }),
    otherwise: Joi.string().optional().allow("").messages({
      "string.base": "End date must be a text.",
    }),
  }),
});

export const updateWorkExperienceBodySchema = Joi.object({
  company: Joi.string().optional().trim().messages({
    "string.base": "Company name must be a text.",
  }),

  position: Joi.string().optional().trim().messages({
    "string.base": "Position must be a text.",
  }),

  responsibilities: Joi.string().optional().trim().min(80).messages({
    "string.base": "Responsibilities must be a text.",
    "string.min": "Responsibilities must be at least 80 characters long.",
  }),

  startDate: Joi.string()
    .optional()
    .trim()
    .pattern(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/)
    .messages({
      "string.base": "Start date must be a text.",
      "string.pattern.base":
        'Start date must be in "MMM YYYY" format (e.g., Jan 2023).',
    }),

  currentlyWorking: Joi.boolean().optional().messages({
    "boolean.base": "Currently working must be true or false.",
  }),

  endDate: Joi.alternatives().conditional("currentlyWorking", {
    is: false,
    then: Joi.string()
      .required()
      .trim()
      .pattern(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/)
      .messages({
        "string.base": "End date must be a text.",
        "string.empty": "End date is required if not currently working.",
        "any.required": "End date is required if not currently working.",
        "string.pattern.base":
          'End date must be in "MMM YYYY" format (e.g., Jan 2023).',
      }),
    otherwise: Joi.string().optional().allow("").trim().messages({
      "string.base": "End date must be a text.",
    }),
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided to update.",
  });

export const addRefereeBodySchema = Joi.object({
  name: Joi.string().required().trim().messages({
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
  address: Joi.string().required().trim().messages({
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
  name: Joi.string().trim().messages({
    "string.base": "Name must be a text.",
  }),
  position: Joi.string().trim().messages({
    "string.base": "Position must be a text.",
  }),
  organization: Joi.string().trim().messages({
    "string.base": "Organization must be a text.",
  }),
  address: Joi.string().trim().messages({
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

export const registerUserSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "Username must be a text.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must not exceed 30 characters.",
    "any.required": "Username is required.",
  }),
  email: Joi.string()
    .trim()
    .lowercase()
    .required()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/)
    .messages({
      "string.base": "Email must be a text.",
      "string.empty": "Email is required.",
      "string.pattern.base": "Please provide a valid email address.",
      "any.required": "Email is required.",
    }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Password must be a text.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
    "any.required": "Password is required.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
    "string.empty": "Confirm password is required.",
    "any.required": "Confirm password is required.",
  }),
});

export const loginUserSchema = Joi.object({
  usernameOrEmail: Joi.string().trim().required().messages({
    "string.base": "Username or email must be a text.",
    "string.empty": "Username or email is required.",
    "any.required": "Username or email is required.",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a text.",
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  }),
});
