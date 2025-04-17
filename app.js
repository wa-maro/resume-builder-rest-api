import express from "express";
import mongoose from "mongoose";
import resumeRouter from "./routers/resume.router.js";
import authRouter from "./routers/auth.router.js";
import authenticate from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connection established"))
  .catch((error) => console.log(error));

app.use("/api/v0/auth", authRouter);
app.use("/api/v0/resumes", authenticate, resumeRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server started at ${process.env.PORT}`)
);
