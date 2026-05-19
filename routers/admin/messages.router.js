import { Router } from "express";
import tryCatch from "../../utils/tryCatch.util.js";
import {
  deactivateMessage,
  getMessage,
  getMessages,
  replyMessage,
} from "../../controllers/admin/messages.controller.js";

const messageAdminRouter = Router();

messageAdminRouter
  .get("/", tryCatch(getMessages, "getMessages"))
  .get("/:id", tryCatch(getMessage, "getMessage"))
  .patch("/:id/reply", tryCatch(replyMessage, "replyMessage"))
  .delete("/:id", tryCatch(deactivateMessage, "deactivateMessage"));

export default messageAdminRouter;
