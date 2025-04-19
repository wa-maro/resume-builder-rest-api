import { Router } from "express";
import {
  addWorkExperience,
  deleteWorkExperience,
  getWorkExperiences,
  updateWorkExperience,
} from "../controllers/workExperience.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addWorkExperienceBodySchema,
  paramsWithIDsSchema,
  updateWorkExperienceBodySchema,
} from "../utils/validators.util.js";

const workExperienceRouter = Router({ mergeParams: true });

workExperienceRouter
  .post(
    "/",
    validate({
      body: addWorkExperienceBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(addWorkExperience, "addWorkExperience")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getWorkExperiences, "getWorkExperiences")
  )
  .patch(
    "/:id",
    validate({
      body: updateWorkExperienceBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(updateWorkExperience, "updateWorkExperience")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteWorkExperience, "deleteWorkExperience")
  );

export default workExperienceRouter;
