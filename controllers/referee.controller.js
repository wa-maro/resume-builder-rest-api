import Referee from "../models/Referee.model.js";
import Resume from "../models/Resume.model.js";

// add new referee for a specific resume
export async function addReferee(req, res) {
  const resumeId = req.params.resumeId;
  const newReferee = req.body;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // check if referee for this resume already exist
  let existingReferee = await Referee.findOne({
    resume: resumeId,
    $or: [{ email: newReferee.email }, { phone: newReferee.phone }],
  });
  if (existingReferee) throw new Error("Resume already exists"); // 409 Conflict

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
}

// get all referees for a specific resume
export async function getReferees(req, res, next) {
  const resumeId = req.params.resumeId;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume doesn't exists"); // 404 Not Found

  const referees = await Referee.find({ resume: resumeId }).lean();

  // return json response
  res.status(200).json({
    success: true,
    message: "Referees retrieved successfully",
    referees,
  });
}

// update existing referee for a specific resume
export async function updateReferee(req, res) {
  const { resumeId, id } = req.params;
  const updatedReferee = req.body;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // check if referee for this resume exists, update and return it
  let existingReferee = await Referee.findOneAndUpdate(
    {
      resume: resumeId,
      _id: id,
    },
    { ...updatedReferee },
    { new: true }
  );
  if (!existingReferee) throw new Error("Referee doesn't exists"); // 404 Not Found

  // return json response
  res.status(200).json({
    success: true,
    message: "Referee updated successfully",
    referee: existingReferee,
  });
}

// delete existing referee for a specific resume
export async function deleteReferee(req, res) {
  const { resumeId, id } = req.params;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new Error("Resume doesn't exists"); // 404 Not Found

  // check if referee for this resume exists, and delete
  let existingReferee = await Referee.findOneAndDelete({
    resume: resumeId,
    _id: id,
  });
  if (!existingReferee) throw new Error("Referee doesn't exists"); // 404 Not Found

  // return json response
  res.status(200).json({
    success: true,
    message: "Referee deleted successfully",
  });
}
