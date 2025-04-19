import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import tryCatch from "../utils/tryCatch.util.js";
import validate from "../middlewares/validation.middleware.js";
import {
  loginBodySchema,
  registerBodySchema,
} from "../utils/validators.util.js";

const authRouter = Router();

authRouter
  .post(
    "/register",
    validate({ body: registerBodySchema }),
    tryCatch(register, "register")
  )
  .post(
    "/login",
    validate({ body: loginBodySchema }),
    tryCatch(login, "login")
  );

export default authRouter;
