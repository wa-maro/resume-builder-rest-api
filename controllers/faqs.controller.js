import FAQ from "../models/FAQ.schema.js";

export const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "FAQs retrieved successfully",
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch FAQs", error });
  }
};
