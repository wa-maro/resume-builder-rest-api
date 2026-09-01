import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
  },
  { _id: false }, // don’t create separate _id for nested docs
);

/**
 * define an academic qualification schema
 */
const AcademicQualificationSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: [
      "Diploma",
      "Advanced Diploma",
      "Bachelor's",
      "Postgraduate Diploma",
      "Master's",
      "Doctorate (PhD)",
    ],
  },
  award: {
    type: String,
    required: true,
    trim: true, // e.g., "Bachelor of Science in Computer Science"
  },
  institution: { type: InstitutionSchema, required: true },
  startYear: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => /^\d{4}$/.test(v),
      message: (props) => `${props.value} is not a valid 4-digit year`,
    },
  },
  endYear: {
    type: Number,
    required: true,
    validate: [
      {
        validator: (v) => /^\d{4}$/.test(v),
        message: (props) => `${props.value} is not a valid 4-digit year`,
      },
      {
        validator: function (v) {
          return this.startYear <= v;
        },
        message: "End year must be greater than or equal to start year",
      },
    ],
  },
  grade: {
    classification: {
      type: String,
      required: true,
      enum: ["First Class", "Upper Second", "Lower Second", "Pass", "Fail"],
    },
    gpa: {
      type: Number,
      required: true,
      min: [0, "GPA cannot be less than 0"],
      max: [5, "GPA cannot be more than 5"],
    },
  },
  certificate: { type: String, trim: true },
  transcript: { type: String, trim: true },
});

export default AcademicQualificationSchema;
