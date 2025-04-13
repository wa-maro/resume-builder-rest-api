import mongoose from "mongoose";

const PersonalDetailSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      unique: true,
    },
    fullName: { type: String, required: true, trim: true },
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
    address: { type: String, required: true, trim: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    nationality: { type: String, required: false },
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
    maritualStatus: {
      type: String,
      required: false,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    socialLinks: {
      linkedIn: { type: String, required: false, trim: true },
      facebook: { type: String, required: false, trim: true },
      x: { type: String, required: false, trim: true },
      github: { type: String, required: false, trim: true },
    },
  },
  { timestamps: true }
);

const PersonalDetail = mongoose.model("PersonalDetail", PersonalDetailSchema);

export default PersonalDetail;
