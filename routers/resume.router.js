import { Router } from "express";
import {
  createResume,
  deleteResume,
  getResume,
  updateResume,
} from "../controllers/resume.controller.js";
import personalDetailRouter from "./personalDetail.router.js";
import educationQualificationsRouter from "./educationQualifications.router.js";
import professionQualificationsRouter from "./professionQualifications.router.js";
import workExperienceRouter from "./workExperience.router.js";

const resumeRouter = Router();

resumeRouter
  .post("/", createResume)
  .get("/:id", getResume)
  .patch("/:id", updateResume)
  .delete("/:id", deleteResume);

resumeRouter
  .use("/:resumeId/personal-detail", personalDetailRouter)
  .use("/:resumeId/education-qualifications", educationQualificationsRouter)
  .use("/:resumeId/profession-qualifications", professionQualificationsRouter)
  .use("/:resumeId/work-experiences", workExperienceRouter);

export default resumeRouter;
