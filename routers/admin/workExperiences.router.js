import { Router } from "express";
import {
  deleteWorkExperience,
  getWorkExperience,
  getWorkExperiences,
  updateWorkExperience,
} from "../../controllers/admin/workExperiences.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { editWorkExperienceBodySchema } from "../../utils/validations/admin.validation.js";

const workExperiencesAdminRouter = Router();

workExperiencesAdminRouter
  .get("/", tryCatch(getWorkExperiences, "getWorkExperiences"))
  .get("/:id", tryCatch(getWorkExperience, "getWorkExperience"))
  .patch(
    "/:id",
    validate(editWorkExperienceBodySchema),
    tryCatch(updateWorkExperience, "updateWorkExperience"),
  )
  .delete("/:id", tryCatch(deleteWorkExperience, "deleteWorkExperience"));

export default workExperiencesAdminRouter;
