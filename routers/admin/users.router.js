import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../../controllers/admin/users.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import { EditUserBodySchema } from "../../utils/validations/admin.validation.js";

const usersAdminRouter = Router();

usersAdminRouter
  .get("/", tryCatch(getUsers, "getUsers"))
  .get("/:username", tryCatch(getUser, "getUser"))
  .patch(
    "/:username",
    validate({ body: EditUserBodySchema }),
    tryCatch(updateUser, "updateUser")
  )
  .delete("/:username", tryCatch(deleteUser, "deleteUser"));

export default usersAdminRouter;
