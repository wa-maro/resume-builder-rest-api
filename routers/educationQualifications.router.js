import { Router } from "express";
import {
  addEducationQualifications,
  deleteEducationQualification,
  getEducationQualifications,
  updateEducationQualification,
} from "../controllers/educationQualifications.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addEducationQualificationBodySchema,
  paramsWithIDsSchema,
  updateEducationQualificationBodySchema,
} from "../utils/validators.util.js";

const educationQualificationsRouter = Router({ mergeParams: true });

educationQualificationsRouter
  .post(
    "/",
    validate({
      body: addEducationQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(addEducationQualifications, "addEducationQualifications")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getEducationQualifications, "getEducationQualifications")
  )
  .patch(
    "/:id",
    validate({
      body: updateEducationQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(updateEducationQualification, "updateEducationQualification")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteEducationQualification, "deleteEducationQualification")
  );

export default educationQualificationsRouter;
