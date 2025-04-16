import mongoose from "mongoose";

// define a education qualification schema
const educationQualificationsSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      enum: ["Primary", "O-Level", "A-Level"],
      required: true,
    },
    schoolName: { type: String, required: true, trim: true },
    startYear: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 4-digit year`,
      },
    },
    endYear: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 4-digit year`,
      },
    },
    certificate: {
      type: String,
      required: true,
      enum: [
        "Primary School Leaving Examination (PSLE)",
        "The Certificate of Secondary Education Examination (CSEE)",
        "Advanced Certificate of Secondary Education Examination (ACSEE)",
      ],
    },
    grade: {
      division: {
        type: String,
        trim: true,
        enum: ["I", "II", "III", "IV", "0"],
      },
      points: { type: String },
    },
  },
  {
    validate: {
      validator: function () {
        return this.startYear <= this.endYear;
      },
      message: "Start year must be less than or equal to end year",
    },
  }
);

// define a profession qualification schema
const professionQualificationsSchema = new mongoose.Schema(
  {
    institutionName: { type: String, required: true, trim: true },
    qualification: {
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
    programme: {
      type: String,
      trim: true,
    },
    startYear: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 4-digit year`,
      },
    },
    endYear: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid 4-digit year`,
      },
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
  },
  {
    validate: {
      validator: function () {
        return this.startYear <= this.endYear;
      },
      message: "Start year must be less than or equal to end year",
    },
  }
);

// define a Education Background schema
const EducationBackgroundSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      unique: true,
    },
    educationQualifications: [educationQualificationsSchema],
    professionQualifications: [professionQualificationsSchema],
  },
  { timestamps: true }
);

// define a Education Background model
const EducationBackground = mongoose.model(
  "EducationBackground",
  EducationBackgroundSchema
);

export default EducationBackground;
