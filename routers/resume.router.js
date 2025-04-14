import { Router } from "express";
import {
  createResume,
  deleteResume,
  getResume,
  updateResume,
} from "../controllers/resume.controller.js";
import personalDetailRouter from "./personalDetail.router.js";

const resumeRouter = Router();

resumeRouter
  .post("/", createResume)
  .get("/:id", getResume)
  .patch("/:id", updateResume)
  .delete("/:id", deleteResume);

resumeRouter.use("/:resumeId/personal-detail", personalDetailRouter);

export default resumeRouter;
