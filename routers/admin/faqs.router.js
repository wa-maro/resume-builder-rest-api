import { Router } from "express";
import {
  createFAQ,
  deleteFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
} from "../../controllers/admin/faq.controller.js";
import validate from "../../middlewares/validation.middleware.js";
import tryCatch from "../../utils/tryCatch.util.js";
import {
  createFAQSchema,
  updateFAQSchema,
} from "../../utils/validations/faqs.validation.js";

const faqsAdminRouter = Router();

faqsAdminRouter
  .post("/", validate(createFAQSchema), tryCatch(createFAQ, "createFAQ"))
  .get("/", tryCatch(getAllFAQs, "getAllFAQs"))
  .get("/:id", tryCatch(getFAQById, "getFAQById"))
  .patch("/:id", validate(updateFAQSchema), tryCatch(updateFAQ, "updateFAQ"))
  .delete("/:id", tryCatch(deleteFAQ, "deleteFAQ"));

export default faqsAdminRouter;
