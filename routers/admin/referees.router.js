import { Router } from "express";
import {
  deleteReferee,
  getReferee,
  getReferees,
  updateReferee,
} from "../../controllers/admin/referees.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { editRefereeBodySchema } from "../../utils/validations/admin.validation.js";

const refereesAdminRouter = Router();

refereesAdminRouter
  .get("/", tryCatch(getReferees, "getReferees"))
  .get("/:id", tryCatch(getReferee, "getReferee"))
  .patch(
    "/:id",
    validate(editRefereeBodySchema),
    tryCatch(updateReferee, "updateReferee")
  )
  .delete("/:id", tryCatch(deleteReferee, "deleteReferee"));

export default refereesAdminRouter;
