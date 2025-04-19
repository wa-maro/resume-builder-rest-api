import { Router } from "express";
import {
  addPersonalDetail,
  getPersonalDetail,
  updatePersonalDetail,
} from "../controllers/personalDetail.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addPersonalDetailBodySchema,
  paramsWithIDsSchema,
  updatePersonalDetailBodySchema,
} from "../utils/validators.util.js";

const personalDetailRouter = Router({ mergeParams: true });

personalDetailRouter
  .post(
    "/",
    validate({
      body: addPersonalDetailBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(addPersonalDetail, "addPersonalDetail")
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getPersonalDetail, "getPersonalDetail")
  )
  .patch(
    "/:id",
    validate({
      body: updatePersonalDetailBodySchema,
      params: paramsWithIDsSchema,
    }),
    tryCatch(updatePersonalDetail, "updatePersonalDetail")
  );

export default personalDetailRouter;
