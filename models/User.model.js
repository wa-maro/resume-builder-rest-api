import mongoose from "mongoose";
import { doHash } from "../utils/hashing.util.js";

// define a User schema
const UserSChema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  password: { type: String, required: true, trim: true, select: false },
});

// hash the password before saving it
UserSChema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await doHash(this.password, 10);
  next();
});

// define a User model
const User = mongoose.model("User", UserSChema);

export default User;
