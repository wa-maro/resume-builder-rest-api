import { Router } from "express";
import tryCatch from "../../utils/tryCatch.util.js";
import { getDashboardStats } from "../../controllers/admin/dashboard.controller.js";

const dashboardAdminRouter = Router();

export default dashboardAdminRouter;

dashboardAdminRouter.get(
  "/stats",
  tryCatch(getDashboardStats, "getDashboardStats")
);
