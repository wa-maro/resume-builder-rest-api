import mongoose from "mongoose";
import { doHash } from "../utils/hashing.util.js";

// define a User schema
const UserSchema = new mongoose.Schema(
  {
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
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// hash the password before saving it
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await doHash(this.password, 10);
  next();
});

UserSchema.virtual("resume", {
  ref: "Resume",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

// define a User model
const User = mongoose.model("User", UserSchema);

export default User;
