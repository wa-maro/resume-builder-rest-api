import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    type: {
      type: String,
      enum: ["soft", "professional"],
      required: true,
    },
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    proficiency: {
      type: String,
      enum: ["beginner", "intermediate", "advanced", "expert"],
    },
    certification: String,
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", SkillSchema);

export default Skill;
