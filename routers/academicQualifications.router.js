import { Router } from "express";
import {
  addAcademicQualification,
  getAcademicQualifications,
  updateAcademicQualification,
  deleteAcademicQualification,
} from "../controllers/academicQualifications.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addAcademicQualificationBodySchema,
  updateAcademicQualificationBodySchema,
} from "../utils/validations/education.validation.js";
import { paramsWithIDsSchema } from "../utils/validators.util.js";
import upload from "../utils/upload.js";
import { normalizeAcademicBody } from "../middlewares/normalize.middleware.js";

const academicQualificationsRouter = Router({ mergeParams: true });

academicQualificationsRouter
  .post(
    "/",
    upload.fields([
      { name: "certificate", maxCount: 1 },
      { name: "transcript", maxCount: 1 },
    ]),
    normalizeAcademicBody,
    validate({
      body: addAcademicQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(addAcademicQualification, "addAcademicQualification")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getAcademicQualifications, "getAcademicQualifications")
  )
  .patch(
    "/:id",
    upload.fields([
      { name: "certificate", maxCount: 1 },
      { name: "transcript", maxCount: 1 },
    ]),
    normalizeAcademicBody,
    validate({
      body: updateAcademicQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(updateAcademicQualification, "updateAcademicQualification")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteAcademicQualification, "deleteAcademicQualification")
  );

export default academicQualificationsRouter;
