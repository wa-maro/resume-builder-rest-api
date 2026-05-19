import { Router } from "express";
import {
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../../controllers/admin/projects.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { editProjectBodySchema } from "../../utils/validations/admin.validation.js";
import upload from "../../utils/upload.js";
import { normalizeProjectBody } from "../../middlewares/normalize.middleware.js";

const projectsAdminRouter = Router();

projectsAdminRouter
  .get("/", tryCatch(getProjects, "getProjects"))
  .get("/:id", tryCatch(getProject, "getProject"))
  .patch(
    "/:id",
    upload.single("image"),
    normalizeProjectBody,
    validate(editProjectBodySchema),
    tryCatch(updateProject, "updateProject")
  )
  .delete("/:id", tryCatch(deleteProject, "deleteProject"));

export default projectsAdminRouter;
