import User from "../models/User.model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/customErrors.util.js";
import { compareHash } from "../utils/hashing.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // check if user already exist
  const existingUser = await User.findOne({ username, email });
  if (existingUser) throw new ConflictError("User already exists");

  // create user and save it
  const newUser = await User({ username, email, password });
  if (!newUser) throw new BadRequestError("User not created");

  const savedUser = await newUser.save();
  savedUser.password = undefined;

  // return json response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  // check if user already exist
  const existingUser = await User.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  })
    .select("+password")
    .lean();
  if (!existingUser) throw new NotFoundError("User doesn't exists");

  // compare password
  const isMatch = compareHash(password, existingUser.password);
  if (!isMatch) throw new BadRequestError("Wrong credentials");
  delete existingUser.password;

  // generate authentication token
  const token = generateToken(existingUser);

  // return json response
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user: {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role,
    },
    token,
  });
};
