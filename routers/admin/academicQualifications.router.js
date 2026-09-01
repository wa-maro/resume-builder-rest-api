import { Router } from "express";
import {
  deleteAcademicQualification,
  getAcademicQualification,
  getAcademicQualifications,
  updateAcademicQualification,
} from "../../controllers/admin/academicQualifications.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import upload from "../../utils/upload.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { editAcademicQualificationBodySchema } from "../../utils/validations/admin.validation.js";
import { normalizeAcademicBody } from "../../middlewares/normalize.middleware.js";

const academicsAdminRouter = Router();

academicsAdminRouter
  .get("/", tryCatch(getAcademicQualifications, "getAcademicQualifications"))
  .get("/:id", tryCatch(getAcademicQualification, "getAcademicQualification"))
  .patch(
    "/:id",
    upload.fields([
      { name: "certificate", maxCount: 1 },
      { name: "transcript", maxCount: 1 },
    ]),
    normalizeAcademicBody,
    validate(editAcademicQualificationBodySchema),
    tryCatch(updateAcademicQualification, "updateAcademicQualification"),
  )
  .delete(
    "/:id",
    tryCatch(deleteAcademicQualification, "deleteAcademicQualification"),
  );

export default academicsAdminRouter;
