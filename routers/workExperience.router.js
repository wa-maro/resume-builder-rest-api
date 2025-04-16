import { Router } from "express";
import {
  addWorkExperience,
  deleteWorkExperience,
  getWorkExperiences,
  updateWorkExperience,
} from "../controllers/workExperience.controller.js";

const workExperienceRouter = Router({ mergeParams: true });

workExperienceRouter
  .post("/", addWorkExperience)
  .get("/", getWorkExperiences)
  .patch("/:id", updateWorkExperience)
  .delete("/:id", deleteWorkExperience);

export default workExperienceRouter;
