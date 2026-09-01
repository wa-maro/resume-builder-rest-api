import { Router } from "express";
import {
  addSchoolQualifications,
  deleteSchoolQualification,
  getSchoolQualifications,
  updateSchoolQualification,
} from "../controllers/schoolQualifications.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import { paramsWithIDsSchema } from "../utils/validators.util.js";
import {
  addSchoolQualificationBodySchema,
  updateSchoolQualificationBodySchema,
} from "../utils/validations/education.validation.js";
import upload from "../utils/upload.js";
import { normalizeSchoolBody } from "../middlewares/normalize.middleware.js";

const schoolQualificationsRouter = Router({ mergeParams: true });

schoolQualificationsRouter
  .post(
    "/",
    upload.single("certificate"),
    normalizeSchoolBody,
    validate({
      body: addSchoolQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(addSchoolQualifications, "addSchoolQualifications"),
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getSchoolQualifications, "getSchoolQualifications"),
  )
  .patch(
    "/:id",
    upload.single("certificate"),
    normalizeSchoolBody,
    validate({
      body: updateSchoolQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(updateSchoolQualification, "updateSchoolQualification"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteSchoolQualification, "deleteSchoolQualification"),
  );

export default schoolQualificationsRouter;
