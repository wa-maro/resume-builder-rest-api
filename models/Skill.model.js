import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    category: {
      type: String,
      enum: ["personal", "professional"],
      required: true,
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    proficiency: { type: Number },
    certificate: { type: String, trim: true },
  },
  { timestamps: true }
);

SkillSchema.index({ resume: 1, category: 1, name: 1 }, { unique: true });

const Skill = mongoose.model("Skill", SkillSchema);

export default Skill;
