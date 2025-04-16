import mongoose from "mongoose";

// define Work Experience schema
const WorkExperienceSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    company: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
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
            v
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
      type: Number,
      required: function () {
        return !this.currentlyWorking;
      },
      trim: true,
      validate: {
        validator: function (v) {
          return /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{4}$/.test(
            v
          );
        },
        message: (props) =>
          `${props.value} is not a valid date format. Use "MMM YYYY" (e.g., Jan 2024).`,
      },
    },
  },
  { timestamps: true }
);

// check if startDate is less than endDate
WorkExperienceSchema.pre("save", function (next) {
  if (!this.currentlyWorking) {
    const start = Date.parse(`01 ${this.startDate}`);
    const end = Date.parse(`01 ${this.endDate}`);
    if (isNaN(start) || isNaN(end)) {
      return next(
        new Error("Invalid date format. Use 'MMM YYYY', e.g., Jan 2024.")
      );
    }
    if (start > end) {
      return next(new Error("Start date must be before or equal to end date."));
    }
  }
  next();
});

// define Work Experience model
const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema);

export default WorkExperience;
