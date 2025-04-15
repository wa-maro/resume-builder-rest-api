import { Router } from "express";
import {
  addEducationQualifications,
  deleteEducationQualification,
  getEducationQualifications,
  updateEducationQualification,
} from "../controllers/educationQualifications.controller.js";

const educationQualificationsRouter = Router({ mergeParams: true });

educationQualificationsRouter
  .post("/", addEducationQualifications)
  .get("/", getEducationQualifications)
  .patch("/:id", updateEducationQualification)
  .delete("/:id", deleteEducationQualification);

export default educationQualificationsRouter;
