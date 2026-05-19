import mongoose from "mongoose";

/**
 * define a education qualification schema
 */
const SchoolQualificationSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["Primary", "O-Level", "A-Level"],
    required: true,
  },
  award: {
    type: String,
    required: true,
    enum: [
      "Primary School Leaving Examination (PSLE)",
      "The Certificate of Secondary Education Examination (CSEE)",
      "Advanced Certificate of Secondary Education Examination (ACSEE)",
    ],
  },
  school: {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
  },
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
    type: {
      division: {
        type: String,
        trim: true,
        enum: ["I", "II", "III", "IV", "0"],
      },
      points: { type: Number, min: 0 },
    },
    required: false,
  },
  certificate: { type: String, trim: true },
});

export default SchoolQualificationSchema;
