import Referee from "../models/Referee.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  addRefereeBodySchema,
  updateRefereeBodySchema,
} from "../utils/validators.util.js";

// add new referee for a specific resume
export async function addReferee(req, res) {
  // validate and sanitize request
  const { error, value } = addRefereeBodySchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const resumeId = req.params.resumeId;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if referee for this resume already exist
  let existingReferee = await Referee.findOne({
    resume: resumeId,
    $or: [{ email: value.email }, { phone: value.phone }],
  });
  if (existingReferee) throw new ConflictError("Resume already exists");

  // Create and save the new experience
  const referee = new Referee({
    ...value,
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
export async function getReferees(req, res) {
  const resumeId = req.params.resumeId;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

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
  // validate and sanitize request
  const { error, value } = updateRefereeBodySchema.validate(req.body);
  if (error) throw new Error(error.details[0].message);

  const { resumeId, id } = req.params;

  // check if resume exists
  const resume = await Resume.findById(resumeId);
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if referee for this resume exists, update and return it
  let existingReferee = await Referee.findOneAndUpdate(
    {
      resume: resumeId,
      _id: id,
    },
    { ...value },
    { new: true }
  );
  if (!existingReferee) throw new NotFoundError("Referee doesn't exists");

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
  if (!resume) throw new NotFoundError("Resume doesn't exists");

  // check if referee for this resume exists, and delete
  let existingReferee = await Referee.findOneAndDelete({
    resume: resumeId,
    _id: id,
  });
  if (!existingReferee) throw new NotFoundError("Referee doesn't exists");

  // return json response
  res.status(204).json({
    success: true,
    message: "Referee deleted successfully",
  });
}
