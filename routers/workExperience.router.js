import { Router } from "express";
import {
  addWorkExperience,
  deleteWorkExperience,
  getWorkExperiences,
  updateWorkExperience,
} from "../controllers/workExperience.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const workExperienceRouter = Router({ mergeParams: true });

workExperienceRouter
  .post("/", tryCatch(addWorkExperience, "addWorkExperience"))
  .get("/", tryCatch(getWorkExperiences, "getWorkExperiences"))
  .patch("/:id", tryCatch(updateWorkExperience, "updateWorkExperience"))
  .delete("/:id", tryCatch(deleteWorkExperience, "deleteWorkExperience"));

export default workExperienceRouter;
