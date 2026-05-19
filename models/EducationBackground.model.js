import mongoose from "mongoose";
import SchoolQualificationSchema from "./SchoolQualification.model.js";
import AcademicQualificationSchema from "./AcademicQualification.model.js";

/**
 *  define a Education Background schema
 */
const EducationBackgroundSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    schoolQualifications: {
      type: [SchoolQualificationSchema],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one school qualification is required",
      },
    },
    academicQualifications: [AcademicQualificationSchema],
  },
  { timestamps: true }
);

// define a Education Background model
const EducationBackground = mongoose.model(
  "EducationBackground",
  EducationBackgroundSchema
);

export default EducationBackground;
