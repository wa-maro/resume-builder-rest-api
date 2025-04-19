import { Router } from "express";
import {
  addProfessionQualification,
  getProfessionQualifications,
  updateProfessionQualification,
  deleteProfessionQualification,
} from "../controllers/professionQualifications.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addProfessionQualificationBodySchema,
  paramsWithIDsSchema,
  updateProfessionQualificationBodySchema,
} from "../utils/validators.util.js";

const professionQualificationsRouter = Router({ mergeParams: true });

professionQualificationsRouter
  .post(
    "/",
    validate({
      body: addProfessionQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(addProfessionQualification, "addProfessionQualification")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getProfessionQualifications, "getProfessionQualifications")
  )
  .patch(
    "/:id",
    validate({
      body: updateProfessionQualificationBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(updateProfessionQualification, "updateProfessionQualification")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteProfessionQualification, "deleteProfessionQualification")
  );

export default professionQualificationsRouter;
