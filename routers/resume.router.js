import { Router } from "express";
import {
  createResume,
  deleteResume,
  getResume,
  previewResume,
  updateResume,
} from "../controllers/resume.controller.js";
import personalInfoRouter from "./personalInfo.router.js";
import schoolQualificationsRouter from "./schoolQualifications.router.js";
import academicQualificationsRouter from "./academicQualifications.router.js";
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
import projectRouter from "./projects.router.js";
import upload from "../utils/upload.js";
import { normalizeResumeBody } from "../middlewares/normalize.middleware.js";

const resumeRouter = Router();

resumeRouter
  .post(
    "/",
    validate({ body: createResumeBodySchema }),
    tryCatch(createResume, "createResume"),
  )
  .get("/", tryCatch(getResume, "getResume"))
  .get("/:resumeId/preview", tryCatch(previewResume, "previewResume"))
  .patch(
    "/:resumeId",
    upload.single("avatar"),
    normalizeResumeBody,
    validate({ body: updateResumeBodySchema, params: paramsWithIDsSchema }),
    tryCatch(updateResume, "updateResume"),
  )
  .delete(
    "/:resumeId",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteResume, "deleteResume"),
  );

resumeRouter
  .use("/:resumeId/personal-information", personalInfoRouter)
  .use("/:resumeId/school-qualifications", schoolQualificationsRouter)
  .use("/:resumeId/academic-qualifications", academicQualificationsRouter)
  .use("/:resumeId/work-experiences", workExperienceRouter)
  .use("/:resumeId/projects", projectRouter)
  .use("/:resumeId/skills", skillRouter)
  .use("/:resumeId/referees", refereeRouter);

export default resumeRouter;
