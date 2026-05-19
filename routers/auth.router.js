import { Router } from "express";
import {
  getAccount,
  login,
  register,
  updateAccount,
} from "../controllers/auth.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  loginBodySchema,
  registerBodySchema,
  updateAccountBodySchema,
} from "../utils/validations/auth.validation.js";

const authRouter = Router();

authRouter
  .post(
    "/register",
    validate({ body: registerBodySchema }),
    tryCatch(register, "register")
  )
  .post("/login", validate({ body: loginBodySchema }), tryCatch(login, "login"))
  .get("/account/:username", tryCatch(getAccount, "getAccount"))
  .patch(
    "/account/:username",
    validate(updateAccountBodySchema),
    tryCatch(updateAccount, "updateAccount")
  );

export default authRouter;
