import Referee from "../models/Referee.model.js";
import Resume from "../models/Resume.model.js";

// add new referee for a specific resume
export async function addReferee(req, res, next) {
  const resumeId = req.params.resumeId;
  const newReferee = req.body;

  try {
    // check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exists",
      });

    // check if referee for this resume already exist
    let existingReferee = await Referee.findOne({
      resume: resumeId,
      $or: [{ email: newReferee.email }, { phone: newReferee.phone }],
    });
    if (existingReferee)
      return res.status(409).json({
        success: false,
        error: "Conflict",
        message:
          "Referee with this email or phone already exists for this resume",
      });

    // Create and save the new experience
    const referee = new Referee({
      ...newReferee,
      resume: resumeId,
    });
    await referee.save();

    // return json response
    res.status(201).json({
      success: true,
      message: "Referee added successfully",
      referee,
    });
  } catch (error) {
    next(error);
  }
}

// get all referees for a specific resume
export async function getReferees(req, res, next) {
  const resumeId = req.params.resumeId;
  try {
    // check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exists",
      });

    const referees = await Referee.find({ resume: resumeId }).lean();

    // return json response
    res.status(200).json({
      success: true,
      message: "Referees retrieved successfully",
      referees,
    });
  } catch (error) {
    next(error);
  }
}

// update existing referee for a specific resume
export async function updateReferee(req, res, next) {
  const { resumeId, id } = req.params;
  const updatedReferee = req.body;

  try {
    // check if resume exists
    const resume = await Resume.findById(resumeId);
    if (!resume)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Resume doesn't exists",
      });

    // check if referee for this resume exists, update and return it
    let existingReferee = await Referee.findOneAndUpdate(
      {
        resume: resumeId,
        _id: id,
      },
      { ...updatedReferee },
      { new: true }
    );
    if (!existingReferee)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Referee doesn't not exist",
      });

    // return json response
    res.status(200).json({
      success: true,
      message: "Referee updated successfully",
      referee: existingReferee,
    });
  } catch (error) {
    next(error);
  }
}

// delete existing referee for a specific resume
export async function deleteReferee(req, res, next) {
  const { resumeId, id } = req.params;

  try {
    // return json response
    res.status(200).json({
      success: true,
      message: "Referee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
