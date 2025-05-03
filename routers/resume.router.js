import { Router } from "express";
import {
  createResume,
  deleteResume,
  getResume,
  updateResume,
} from "../controllers/resume.controller.js";
import personalInfoRouter from "./personalInfo.router.js";
import educationQualificationsRouter from "./educationQualifications.router.js";
import professionQualificationsRouter from "./professionQualifications.router.js";
import workExperienceRouter from "./workExperience.router.js";
import skillRouter from "./skill.router.js";
import refereeRouter from "./referee.router.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  createResumeBodySchema,
  paramsWithIDsSchema,
  updateResumeBodySchema,
} from "../utils/validators.util.js";

const resumeRouter = Router();

resumeRouter
  .post(
    "/",
    validate({ body: createResumeBodySchema }),
    tryCatch(createResume, "createResume")
  )
  .get("/", tryCatch(getResume, "getResume"))
  .patch(
    "/:resumeId",
    validate({ body: updateResumeBodySchema, params: paramsWithIDsSchema }),
    tryCatch(updateResume, "updateResume")
  )
  .delete(
    "/:resumeId",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteResume, "ddeleteResume")
  );

resumeRouter
  .use("/:resumeId/personal-information", personalInfoRouter)
  .use("/:resumeId/education-qualifications", educationQualificationsRouter)
  .use("/:resumeId/profession-qualifications", professionQualificationsRouter)
  .use("/:resumeId/work-experiences", workExperienceRouter)
  .use("/:resumeId/skills", skillRouter)
  .use("/:resumeId/referees", refereeRouter);

export default resumeRouter;
