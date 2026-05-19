import { Router } from "express";
import {
  addPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
} from "../controllers/personalInfo.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import { paramsWithIDsSchema } from "../utils/validators.util.js";
import {
  addPersonalInfoBodySchema,
  updatePersonalInfoBodySchema,
} from "../utils/validations/personalInfo.validation.js";

const personalInfoRouter = Router({ mergeParams: true });

personalInfoRouter
  .post(
    "/",
    validate({
      params: paramsWithIDsSchema,
      body: addPersonalInfoBodySchema,
    }),
    tryCatch(addPersonalInfo, "addPersonalInfo")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getPersonalInfo, "getPersonalInfo")
  )
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: updatePersonalInfoBodySchema,
    }),
    tryCatch(updatePersonalInfo, "updatePersonalInfo")
  );

export default personalInfoRouter;
