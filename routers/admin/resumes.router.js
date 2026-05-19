import { Router } from "express";
import {
  deleteResume,
  getResume,
  getResumes,
  updateResume,
} from "../../controllers/admin/resumes.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { EditResumeBodySchema } from "../../utils/validations/admin.validation.js";

const resumesAdminRouter = Router();

resumesAdminRouter
  .get("/", tryCatch(getResumes, "getResumes"))
  .get("/:id", tryCatch(getResume, "getResume"))
  .patch(
    "/:id",
    validate(EditResumeBodySchema),
    tryCatch(updateResume, "updateResume")
  )
  .delete("/:id", tryCatch(deleteResume, "deleteResume"));

export default resumesAdminRouter;
