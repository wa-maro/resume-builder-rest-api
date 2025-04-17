import { Router } from "express";
import {
  addSkill,
  deleteSkill,
  getSkills,
  updateSkill,
} from "../controllers/skill.controller.js";

const skillRouter = Router({ mergeParams: true });

skillRouter
  .post("/", addSkill)
  .get("/", getSkills)
  .patch("/:id", updateSkill)
  .delete("/:id", deleteSkill);

export default skillRouter;
