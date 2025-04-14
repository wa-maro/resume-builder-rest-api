import { Router } from "express";
import {
  addProfessionQualification,
  getProfessionQualifications,
  updateProfessionQualification,
  deleteProfessionQualification,
} from "../controllers/professionQualifications.controller.js";

const professionQualificationsRouter = Router({ mergeParams: true });

professionQualificationsRouter
  .post("/", addProfessionQualification)
  .get("/", getProfessionQualifications)
  .patch("/:id", updateProfessionQualification)
  .delete("/:id", deleteProfessionQualification);

export default professionQualificationsRouter;
