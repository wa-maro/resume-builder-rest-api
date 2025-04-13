import { Router } from "express";
import {
  createResume,
  deleteResume,
  getResume,
  updateResume,
} from "../controllers/resume.controller.js";

const resumeRouter = Router();

resumeRouter
  .post("/", createResume)
  .get("/:id", getResume)
  .patch("/:id", updateResume)
  .delete("/:id", deleteResume);

export default resumeRouter;
