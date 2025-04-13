import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connection established"))
  .catch((error) => console.log(error));

app.get("/", (req, res) =>
  res.json({ success: true, message: "Resume Builder - Restful API" })
);

app.listen(process.env.PORT, () =>
  console.log(`Server started at ${process.env.PORT}`)
);
