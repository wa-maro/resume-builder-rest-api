import Resume from "../../models/Resume.model.js";

export const getResumes = async (req, res) => {
  const { page = 1, limit = 25, sort = "createdAt", isActive } = req.query;

  const query = {};
  if (isActive !== undefined) query.isActive = isActive === "true";

  const resumes = await Resume.find(query)
    .populate("user", "username") // include user info
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .lean();

  const total = await Resume.countDocuments(query);

  return res.status(200).json({
    success: true,
    message: "Resumes retrieved successfully",
    data: resumes,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

export const getResume = async (req, res) => {
  const { id } = req.params;

  const resume = await Resume.findById(id).populate("user", "_id username");
  if (!resume) throw new NotFoundError("Resume not found");

  return res.status(200).json({
    success: true,
    message: "Resume preview retrieved successfully",
    data: resume,
  });
};

export const updateResume = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const resume = await Resume.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!resume) throw new NotFoundError("Resume not found");

  return res.status(200).json({
    success: true,
    message: "Resume updated successfully",
    data: resume,
  });
};

// SOFT DELETE resume
export const deleteResume = async (req, res) => {
  const { id } = req.params;

  const resume = await Resume.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );

  if (!resume) throw new NotFoundError("Resume not found");

  return res.status(200).json({
    success: true,
    message: "Resume deactivated successfully",
  });
};
