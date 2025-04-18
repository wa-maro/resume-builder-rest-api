import express from "express";
import mongoose from "mongoose";
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

app.use(express.json());

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
