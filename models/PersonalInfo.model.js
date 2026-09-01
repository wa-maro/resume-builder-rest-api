import mongoose from "mongoose";

// define a Personal Information schema
const PersonalInfoSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      unique: true,
    },
    fullName: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^([0-2][0-9]|(3)[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid date. Use DD/MM/YYYY format.`,
      },
    },
    nationality: { type: String, required: true, trim: true },
    placeOfDomicile: { type: String, trim: true },
    maritualStatus: {
      type: String,
      enum: ["single", "married", "divorced", "widowed"],
    },
    disabilities: {
      type: [String],
      enum: ["none", "visual", "hearing", "mobility", "cognitive", "other"],
      default: ["none"],
      validate: {
        validator: function (arr) {
          return !(arr.includes("none") && arr.length > 1);
        },
        message:
          "If 'none' is selected, no other disabilities can be selected.",
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [
        /^\+?[0-9]{7,15}$/,
        "Please provide a valid phone number (7-15 digits, optional + at start)",
      ],
    },
    physicalAddress: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

// define a Personal Infomation model
const PersonalInfo = mongoose.model("PersonalInfomation", PersonalInfoSchema);

export default PersonalInfo;
