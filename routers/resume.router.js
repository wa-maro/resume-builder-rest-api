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
import skillRouter from "./skill.router.js";
import refereeRouter from "./referee.router.js";
import tryCatch from "../utils/tryCatch.util.js";

const resumeRouter = Router();

resumeRouter
  .post("/", tryCatch(createResume, "createResume"))
  .get("/:id", tryCatch(getResume, "getResume"))
  .patch("/:id", tryCatch(updateResume, "updateResume"))
  .delete("/:id", tryCatch(deleteResume, "ddeleteResume"));

resumeRouter
  .use("/:resumeId/personal-detail", personalDetailRouter)
  .use("/:resumeId/education-qualifications", educationQualificationsRouter)
  .use("/:resumeId/profession-qualifications", professionQualificationsRouter)
  .use("/:resumeId/work-experiences", workExperienceRouter)
  .use("/:resumeId/skills", skillRouter)
  .use("/:resumeId/referees", refereeRouter);

export default resumeRouter;
