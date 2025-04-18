import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const authRouter = Router();

authRouter
  .post("/register", tryCatch(register, "register"))
  .post("/login", tryCatch(login, "login"));

export default authRouter;
