import { Router } from "express";
import {
  addPersonalDetail,
  getPersonalDetail,
  updatePersonalDetail,
} from "../controllers/personalDetail.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const personalDetailRouter = Router({ mergeParams: true });

personalDetailRouter
  .post("/", tryCatch(addPersonalDetail, "addPersonalDetail"))
  .get("/:id", tryCatch(getPersonalDetail, "getPersonalDetail"))
  .patch("/:id", tryCatch(updatePersonalDetail, "updatePersonalDetail"));

export default personalDetailRouter;
