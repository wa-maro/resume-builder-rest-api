import { Router } from "express";
import {
  addReferee,
  deleteReferee,
  getReferees,
  updateReferee,
} from "../controllers/referee.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const refereeRouter = Router({ mergeParams: true });

refereeRouter
  .post("/", tryCatch(addReferee, "addReferee"))
  .get("/", tryCatch(getReferees, "getReferees"))
  .patch("/:id", tryCatch(updateReferee, "updateReferee"))
  .delete("/:id", tryCatch(deleteReferee, "deleteReferee"));

export default refereeRouter;
