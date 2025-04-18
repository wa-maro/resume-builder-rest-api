import { Router } from "express";
import {
  addSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skill.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const skillRouter = Router({ mergeParams: true });

skillRouter
  .post("/", tryCatch(addSkill, "addSkill"))
  .get("/", tryCatch(getSkills, "getSkills"))
  .patch("/:id", tryCatch(updateSkill, "updateSkill"))
  .delete("/:id", tryCatch(deleteSkill, "deleteSkill"));

export default skillRouter;
