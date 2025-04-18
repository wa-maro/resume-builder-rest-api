import { Router } from "express";
import {
  addProfessionQualification,
  getProfessionQualifications,
  updateProfessionQualification,
  deleteProfessionQualification,
} from "../controllers/professionQualifications.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const professionQualificationsRouter = Router({ mergeParams: true });

professionQualificationsRouter
  .post("/", tryCatch(addProfessionQualification, "addProfessionQualification"))
  .get(
    "/",
    tryCatch(getProfessionQualifications, "getProfessionQualifications")
  )
  .patch(
    "/:id",
    tryCatch(updateProfessionQualification, "updateProfessionQualification")
  )
  .delete(
    "/:id",
    tryCatch(deleteProfessionQualification, "deleteProfessionQualification")
  );

export default professionQualificationsRouter;
