import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import resumeRouter from "./routers/resume.router.js";
import authRouter from "./routers/auth.router.js";
import authenticate from "./middlewares/auth.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import { infoLogger } from "./utils/errorLoggers.util.js";
import adminRouter from "./routers/admin/admin.router.js";
import faqRouter from "./routers/faqs.router.js";
import messageRouter from "./routers/messages.router.js";

const app = express();

app.use((req, res, next) => {
  infoLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(
  helmet({
    crossOriginResourcePolicy: false, // disable CORP for serving static files
  })
); // Set the security headers
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); // Enable CORS before anything that needs to send headers
app.use(express.json());
app.use(cookieParser()); // Parse cookies before you use them (e.g., in auth middleware)
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connection established"))
  .catch((error) => console.log(error));

app.use("/api/v0/auth", authRouter);
app.use("/api/v0/resume", authenticate, resumeRouter);
app.use("/api/v0/faqs", faqRouter);
app.use("/api/v0/messages", messageRouter);
app.use("/api/v1/admin", authenticate, adminRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started at ${process.env.PORT}`)
);
