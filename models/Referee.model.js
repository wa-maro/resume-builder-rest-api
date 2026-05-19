import mongoose from "mongoose";

const RefereeSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    fullName: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    physicalAddress: { type: String, required: false },
    email: {
      type: String,
      required: true,
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
      match: [
        /^\+?[0-9]{7,15}$/,
        "Please provide a valid phone number (7-15 digits, optional + at start)",
      ],
    },
  },
  { timestamps: true }
);

RefereeSchema.index({ resume: 1, email: 1 }, { unique: true });
RefereeSchema.index({ resume: 1, phone: 1 }, { unique: true });

const Referee = mongoose.model("Referee", RefereeSchema);

export default Referee;
