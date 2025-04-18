import { Router } from "express";
import {
  addEducationQualifications,
  deleteEducationQualification,
  getEducationQualifications,
  updateEducationQualification,
} from "../controllers/educationQualifications.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const educationQualificationsRouter = Router({ mergeParams: true });

educationQualificationsRouter
  .post("/", tryCatch(addEducationQualifications, "addEducationQualifications"))
  .get("/", tryCatch(getEducationQualifications, "getEducationQualifications"))
  .patch(
    "/:id",
    tryCatch(updateEducationQualification, "updateEducationQualification")
  )
  .delete(
    "/:id",
    tryCatch(deleteEducationQualification, "deleteEducationQualification")
  );

export default educationQualificationsRouter;
