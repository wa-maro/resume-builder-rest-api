import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, uniqie: true, trim: true },
    answer: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 }, // optional: for sorting
    isActive: { type: Boolean, default: true }, // optional: toggle visibility
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", FAQSchema);

export default FAQ;
