import { Router } from "express";
import {
  addReferee,
  deleteReferee,
  getReferees,
  updateReferee,
} from "../controllers/referee.controller.js";

const refereeRouter = Router({ mergeParams: true });

refereeRouter
  .post("/", addReferee)
  .get("/", getReferees)
  .patch("/:id", updateReferee)
  .delete("/:id", deleteReferee);

export default refereeRouter;
