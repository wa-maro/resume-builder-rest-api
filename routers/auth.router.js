import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register).post("/login", login);

export default authRouter;
