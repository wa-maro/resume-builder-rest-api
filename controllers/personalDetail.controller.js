import PersonalDetail from "../models/personalDetail.model.js";
import Resume from "../models/Resume.model.js";

// add new personal detail to a resume
export const addPersonalDetail = async (req, res, next) => {
  try {
    // check if the resume exists and return it
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // check if personal detail already exist for given resume
    const existingPersonalDetail = await PersonalDetail.findOne({
      resume: resume._id,
    });
    if (existingPersonalDetail)
      return res.status(409).json({
        success: false,
        error: "Conflict",
        message: "Personal detail already exist in this resume",
      });

    // add personal detail and save it
    const newPersonalDetail = new PersonalDetail({
      resume: resume._id,
      ...req.body,
    });
    if (!newPersonalDetail)
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        message: "Failed to add personal detail",
      });
    const savedPersonalDetail = await newPersonalDetail.save();

    // return json response
    res.status(200).json({
      success: true,
      message: "Personal detail added successfully",
      personalDetail: savedPersonalDetail,
    });
  } catch (error) {
    next(error);
  }
};

// add new personal detail to a resume
export const getPersonalDetail = async (req, res, next) => {
  try {
    // check if the resume exists and return it
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // find existing personal detail and return it
    const existingPersonalDetail = await PersonalDetail.findOne({
      resume: resume._id,
      _id: req.params.id,
    });
    if (!existingPersonalDetail)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Personal detail doesn't exist in this resume",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Personal detail retrieved successfully",
      personalDetail: existingPersonalDetail,
    });
  } catch (error) {
    next(error);
  }
};

// add new personal detail to a resume
export const updatePersonalDetail = async (req, res, next) => {
  try {
    // check if the resume exists and return it
    const resume = await Resume.findById(req.params.resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exist",
      });

    // find existing personal detail and update it
    const updatedPersonalDetail = await PersonalDetail.findOneAndUpdate(
      { resume: resume._id, _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    if (!updatedPersonalDetail)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Personal details doesn't exist in this resume",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Personal detail updated successfully",
      personalDetail: updatedPersonalDetail,
    });
  } catch (error) {
    next(error);
  }
};
