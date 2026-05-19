import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true, trim: true },
    socialLinks: [{ type: String, trim: true }],
    tools: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
