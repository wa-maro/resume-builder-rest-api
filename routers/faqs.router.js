import { Router } from "express";
import { getAllFAQs } from "../controllers/faqs.controller.js";
import tryCatch from "../utils/tryCatch.util.js";

const faqRouter = Router();

faqRouter.get("/", tryCatch(getAllFAQs, "getAllFAQs"));

export default faqRouter;
