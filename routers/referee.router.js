import { Router } from "express";
import {
  addReferee,
  deleteReferee,
  getReferees,
  updateReferee,
} from "../controllers/referee.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  addRefereeBodySchema,
  paramsWithIDsSchema,
  updateRefereeBodySchema,
} from "../utils/validators.util.js";

const refereeRouter = Router({ mergeParams: true });

refereeRouter
  .post(
    "/",
    validate({ body: addRefereeBodySchema, params: paramsWithIDsSchema }),
    tryCatch(addReferee, "addReferee")
  )
  .get(
    "/",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getReferees, "getReferees")
  )
  .patch(
    "/:id",
    validate({ body: updateRefereeBodySchema, params: paramsWithIDsSchema }),
    tryCatch(updateReferee, "updateReferee")
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteReferee, "deleteReferee")
  );

export default refereeRouter;
