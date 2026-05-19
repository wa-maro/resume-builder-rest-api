import FAQ from "../../models/FAQ.schema.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../utils/customErrors.util.js";

export const createFAQ = async (req, res) => {
  try {
    const { question, answer, order, isActive } = req.body;

    const faq = new FAQ({ question, answer, order, isActive });
    if (!faq) throw new BadRequestError("Failed to create faq");

    const savedFAQ = await faq.save();

    res.status(200).json({
      success: true,
      message: "FAQ created successfully",
      data: savedFAQ,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create FAQ", error });
  }
};

export const getAllFAQs = async (req, res) => {
  const faqs = await FAQ.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "FAQs retrieved successfully",
    data: faqs,
  });
};

export const getFAQById = async (req, res) => {
  const { id } = req.params;

  const faq = await FAQ.findById(id);
  if (!faq) throw new NotFoundError("FAQ not found");

  return res.status(200).json({
    success: true,
    message: "FAQ retrieved successfully",
    data: faq,
  });
};

export const updateFAQ = async (req, res) => {
  const { id } = req.params;
  const { question, answer, order, isActive } = req.body;

  const updatedFAQ = await FAQ.findByIdAndUpdate(
    id,
    { question, answer, order, isActive },
    { new: true, runValidators: true }
  );
  if (!updatedFAQ) throw new NotFoundError("FAQ not found");

  return res.status(200).json({
    success: true,
    message: "FAQ retrieved successfully",
    data: updatedFAQ,
  });
};

export const deleteFAQ = async (req, res) => {
  const { id } = req.params;

  const deletedFAQ = await FAQ.findByIdAndDelete(id);
  if (!deletedFAQ) throw new NotFoundError("FAQ not found");

  return res.status(200).json({
    success: true,
    message: "FAQ retrieved successfully",
  });
};
