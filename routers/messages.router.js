import { Router } from "express";
import { createMessage } from "../controllers/messages.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const messageRouter = Router();

messageRouter.post("/", tryCatch(createMessage, "createMessage"));

export default messageRouter;
