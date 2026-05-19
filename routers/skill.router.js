import { Router } from "express";
import {
  addSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skill.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import { paramsWithIDsSchema } from "../utils/validators.util.js";
import {
  addSkillBodySchema,
  updateSkillBodySchema,
} from "../utils/validations/skills.validation.js";
import upload from "../utils/upload.js";
import skillNormalizeBody from "../middlewares/normalize.middleware.js";

const skillRouter = Router({ mergeParams: true });

skillRouter
  .post(
    "/",
    upload.single("certificate"),
    skillNormalizeBody,
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
    upload.single("certificate"),
    skillNormalizeBody,
    validate({ body: updateSkillBodySchema, params: paramsWithIDsSchema }),
    tryCatch(updateSkill, "updateSkill")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteSkill, "deleteSkill")
  );

export default skillRouter;
