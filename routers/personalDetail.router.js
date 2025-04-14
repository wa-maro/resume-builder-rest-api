import { Router } from "express";
import {
  addPersonalDetail,
  getPersonalDetail,
  updatePersonalDetail,
} from "../controllers/personalDetail.controller.js";

const personalDetailRouter = Router({ mergeParams: true });

personalDetailRouter
  .post("/", addPersonalDetail)
  .get("/:id", getPersonalDetail)
  .patch("/:id", updatePersonalDetail);

export default personalDetailRouter;
