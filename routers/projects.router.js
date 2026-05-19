import { Router } from "express";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projects.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addProjectBodySchema,
  updateProjectBodySchema,
} from "../utils/validations/project.validation.js";
import { paramsWithIDsSchema } from "../utils/validators.util.js";
import upload from "../utils/upload.js";
import { normalizeProjectBody } from "../middlewares/normalize.middleware.js";

const projectRouter = Router({ mergeParams: true });

projectRouter
  .post(
    "/",
    upload.single("image"),
    normalizeProjectBody,
    validate({ body: addProjectBodySchema, params: paramsWithIDsSchema }),
    tryCatch(addProject, "addProject")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getProjects, "getProjects")
  )
  .patch(
    "/:id",
    upload.single("image"),
    normalizeProjectBody,
    validate({ body: updateProjectBodySchema, params: paramsWithIDsSchema }),
    tryCatch(updateProject, "updateProject")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteProject, "deleteProject")
  );

export default projectRouter;
