import Referee from "../models/Referee.model.js";
import Resume from "../models/Resume.model.js";
import { ConflictError, NotFoundError } from "../utils/customErrors.util.js";
import {
  addRefereeBodySchema,
  updateRefereeBodySchema,
} from "../utils/validations/referee.validation.js";

// add new referee for a specific resume
export async function addReferee(req, res) {
  const { error } = addRefereeBodySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  const newReferee = req.body;

  // check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume Not Found");

  // check if referee for this resume already exist
  let existingReferee = await Referee.findOne({
    resume: resume._id,
    $or: [{ email: newReferee.email }, { phone: newReferee.phone }],
  });
  if (existingReferee) throw new ConflictError("Resume already exists");

  // Create and save the new experience
  const referee = new Referee({
    ...newReferee,
    resume: resume._id,
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
  // check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume Not Found");

  const referees = await Referee.find({ resume: resume._id }).lean();

  // return json response
  res.status(200).json({
    success: true,
    message: "Referees retrieved successfully",
    referees,
  });
}

// update existing referee for a specific resume
export async function updateReferee(req, res) {
  const { error } = updateRefereeBodySchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  // check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume Not Found");

  // check if referee for this resume exists, update and return it
  let existingReferee = await Referee.findOneAndUpdate(
    {
      resume: resume._id,
      _id: req.params.id,
    },
    { ...req.body },
    { new: true }
  );
  if (!existingReferee) throw new NotFoundError("Referee Not Found");

  // return json response
  res.status(200).json({
    success: true,
    message: "Referee updated successfully",
    referee: existingReferee,
  });
}

// delete existing referee for a specific resume
export async function deleteReferee(req, res) {
  // check if resume exists
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) throw new NotFoundError("Resume Not Found");

  // check if referee for this resume exists, and delete
  let existingReferee = await Referee.findOneAndDelete({
    resume: resume._id,
    _id: req.params.id,
  });
  if (!existingReferee) throw new NotFoundError("Referee Not Found");

  // return json response
  res.status(200).json({
    success: true,
    message: "Referee deleted successfully",
  });
}
