import { Router } from "express";
import {
  addEducationQualification,
  deleteEducationQualification,
  getEducationQualifications,
  updateEducationQualification,
} from "../controllers/educationQualifications.controller.js";

const educationQualificationsRouter = Router({ mergeParams: true });

educationQualificationsRouter
  .post("/", addEducationQualification)
  .get("/", getEducationQualifications)
  .patch("/:id", updateEducationQualification)
  .delete("/:id", deleteEducationQualification);

export default educationQualificationsRouter;
