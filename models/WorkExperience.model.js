import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
  },
  { _id: false }, // don’t create separate _id for nested docs
);

// define Work Experience schema
const WorkExperienceSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    position: { type: String, required: true, trim: true },
    company: { type: CompanySchema, required: true },
    responsibilities: {
      type: String,
      required: true,
      trim: true,
      minLength: 80,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/.test(
            v,
          );
        },
        message: (props) =>
          `${props.value} is not a valid date format. Use "MMM YYYY" (e.g., Jan 2024).`,
      },
    },
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
    endDate: {
      type: String, // FIXED: must be a string, not number
      required: function () {
        return !this.currentlyWorking;
      },
      trim: true,
      validate: {
        validator: function (v) {
          return (
            !v ||
            /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/.test(v)
          );
        },
        message: (props) =>
          `${props.value} is not a valid date format. Use "MMM YYYY" (e.g., Jan 2024).`,
      },
    },
  },
  { timestamps: true },
);

// check if startDate is less than endDate on save
WorkExperienceSchema.pre("save", function (next) {
  if (!this.currentlyWorking) {
    const start = Date.parse(`01 ${this.startDate}`);
    const end = Date.parse(`01 ${this.endDate}`);
    if (isNaN(start) || isNaN(end)) {
      return next(
        new Error("Invalid date format. Use 'MMM YYYY', e.g., Jan 2024."),
      );
    }
    if (start > end) {
      return next(new Error("Start date must be before or equal to end date."));
    }
  }
  next();
});

// also validate on updates
WorkExperienceSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  const { startDate, endDate, currentlyWorking } = update || {};

  if (currentlyWorking === false && startDate && endDate) {
    const start = Date.parse(`01 ${startDate}`);
    const end = Date.parse(`01 ${endDate}`);
    if (isNaN(start) || isNaN(end)) {
      return next(
        new Error("Invalid date format. Use 'MMM YYYY', e.g., Jan 2024."),
      );
    }
    if (start > end) {
      return next(new Error("Start date must be before or equal to end date."));
    }
  }
  next();
});

WorkExperienceSchema.index(
  { resume: 1, "company.name": 1, position: 1, startDate: 1 },
  { unique: true },
);

// define Work Experience model
const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema);

export default WorkExperience;
