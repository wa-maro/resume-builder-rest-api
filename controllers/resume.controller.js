import Resume from "../models/Resume.model.js";

// create a new resume: for specific user
export const createResume = async (req, res, next) => {
  try {
    // check if resume by given user already exist
    const existingResume = await Resume.findOne({ user: req.user.id });
    if (existingResume)
      return res.status(409).json({
        success: false,
        error: "Conflict",
        message: "Resume already existing for this user",
      });

    // create a resume and save it
    const newResume = new Resume({ user: req.user.id, ...req.body });
    if (!newResume)
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        message: "Failed to create resume",
      });
    const savedResume = await newResume.save();

    // return json response
    res.status(200).json({
      success: true,
      message: "New resume created successfully",
      resume: savedResume,
    });
  } catch (error) {
    next(error);
  }
};

// retrieve existing resume by id: for specific user
export const getResume = async (req, res, next) => {
  try {
    // get a resume by given user and return it
    const existingResume = await Resume.findOne({
      user: req.user.id,
      _id: req.params.id,
    });
    if (!existingResume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't existing for this user",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Resume retrieved successfully",
      resume: existingResume,
    });
  } catch (error) {
    next(error);
  }
};

// updated existing resume by id: for specific user
export const updateResume = async (req, res, next) => {
  try {
    // get a resume by given user and update it
    const updatedResume = await Resume.findOneAndUpdate(
      {
        user: req.user.id,
        _id: req.params.id,
      },
      { ...req.body },
      { new: true }
    );
    if (!updatedResume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't existing for this user",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error) {
    next(error);
  }
};

// delete existing resume by id: for specific user
export const deleteResume = async (req, res, next) => {
  try {
    // get a resume by given user and return it
    const deletedResume = await Resume.findOneAndDelete({
      user: req.user.id,
      _id: req.params.id,
    });
    if (!deletedResume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't existing for this user",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
