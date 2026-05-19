import { Router } from "express";
import {
  deleteSchoolQualification,
  getSchoolQualification,
  getSchoolQualifications,
  updateSchoolQualification,
} from "../../controllers/admin/schoolQualifications.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import upload from "../../utils/upload.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { editSchoolQualificationBodySchema } from "../../utils/validations/admin.validation.js";
import { normalizeSchoolBody } from "../../middlewares/normalize.middleware.js";

const schoolsAdminRouter = Router();

schoolsAdminRouter
  .get("/", tryCatch(getSchoolQualifications, "getSchoolQualifications"))
  .get("/:id", tryCatch(getSchoolQualification, "getSchoolQualification"))
  .patch(
    "/:id",
    upload.single("certificate"),
    normalizeSchoolBody,
    validate(editSchoolQualificationBodySchema),
    tryCatch(updateSchoolQualification, "updateSchoolQualification")
  )
  .delete(
    "/:id",
    tryCatch(deleteSchoolQualification, "deleteSchoolQualification")
  );

export default schoolsAdminRouter;
