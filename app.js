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

const app = express();

app.use((req, res, next) => {
  infoLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(helmet()); // Set the security headers
app.use(cors()); // Enable CORS before anything that needs to send headers
app.use(express.json());
app.use(cookieParser()); // Parse cookies before you use them (e.g., in auth middleware)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connection established"))
  .catch((error) => console.log(error));

app.use("/api/v0/auth", authRouter);
app.use("/api/v0/resumes", authenticate, resumeRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started at ${process.env.PORT}`)
);
