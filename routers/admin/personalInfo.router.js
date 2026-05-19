import { Router } from "express";
import {
  deletePersonalInfo,
  getPersonalInfo,
  getPersonalInfos,
  updatePersonalInfo,
} from "../../controllers/admin/personalInfo.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { editPersonalInfoBodySchema } from "../../utils/validations/admin.validation.js";

const personalInfoAdminRouter = Router();

personalInfoAdminRouter
  .get("/", tryCatch(getPersonalInfos, "getPersonalInfos"))
  .get("/:id", tryCatch(getPersonalInfo, "getPersonalInfo"))
  .patch(
    "/:id",
    validate(editPersonalInfoBodySchema),
    tryCatch(updatePersonalInfo, "updatePersonalInfo")
  )
  .delete("/:id", tryCatch(deletePersonalInfo, "deletePersonalInfo"));

export default personalInfoAdminRouter;
