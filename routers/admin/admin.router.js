import { Router } from "express";
import usersAdminRouter from "./users.router.js";
import resumesAdminRouter from "./resumes.router.js";
import dashboardAdminRouter from "./dashboard.router.js";
import personalInfoAdminRouter from "./personalInfo.router.js";
import skillsAdminRouter from "./skills.router.js";
import projectsAdminRouter from "./projects.router.js";
import refereesAdminRouter from "./referees.router.js";
import workExperiencesAdminRouter from "./workExperiences.router.js";
import academicsAdminRouter from "./academicQualifications.router.js";
import schoolsAdminRouter from "./schoolQualifications.router.js";
import faqsAdminRouter from "./faqs.router.js";
import messageAdminRouter from "./messages.router.js";

const adminRouter = Router();

adminRouter
  .use("/dashboard", dashboardAdminRouter)
  .use("/users", usersAdminRouter)
  .use("/resumes", resumesAdminRouter)
  .use("/personal-informations", personalInfoAdminRouter)
  .use("/school-qualifications", schoolsAdminRouter)
  .use("/academic-qualifications", academicsAdminRouter)
  .use("/projects", projectsAdminRouter)
  .use("/work-experiences", workExperiencesAdminRouter)
  .use("/skills", skillsAdminRouter)
  .use("/referees", refereesAdminRouter)
  .use("/faqs", faqsAdminRouter)
  .use("/messages", messageAdminRouter);

export default adminRouter;
