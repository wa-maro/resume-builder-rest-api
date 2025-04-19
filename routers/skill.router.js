import { Router } from "express";
import {
  addSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skill.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addSkillBodySchema,
  paramsWithIDsSchema,
  updateSkillBodySchema,
} from "../utils/validators.util.js";

const skillRouter = Router({ mergeParams: true });

skillRouter
  .post(
    "/",
    validate({ body: addSkillBodySchema, params: paramsWithIDsSchema }),
    tryCatch(addSkill, "addSkill")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getSkills, "getSkills")
  )
  .patch(
    "/:id",
    validate({ body: updateSkillBodySchema, params: paramsWithIDsSchema }),
    tryCatch(updateSkill, "updateSkill")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteSkill, "deleteSkill")
  );

export default skillRouter;
