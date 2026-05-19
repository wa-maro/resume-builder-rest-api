import { Router } from "express";
import {
  deleteSkill,
  getSkill,
  getSkills,
  updateSkill,
} from "../../controllers/admin/skills.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { editSkillBodySchema } from "../../utils/validations/admin.validation.js";
import upload from "../../utils/upload.js";
import skillNormalizeBody from "../../middlewares/normalize.middleware.js";

const skillsAdminRouter = Router();

skillsAdminRouter
  .get("/", tryCatch(getSkills, "getSkills"))
  .get("/:id", tryCatch(getSkill, "getSkill"))
  .patch(
    "/:id",
    upload.single("certificate"),
    skillNormalizeBody,
    validate(editSkillBodySchema),
    tryCatch(updateSkill, "updateSkill")
  )
  .delete("/:id", tryCatch(deleteSkill, "deleteSkill"));

export default skillsAdminRouter;
