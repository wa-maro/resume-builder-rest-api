import User from "../models/User.model.js";
import { compareHash } from "../utils/hashing.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // check if user already exist
  const existingUser = await User.findOne({ username, email });
  if (existingUser) throw new Error("User already exists"); // 409 Conflict

  // create user and save it
  const newUser = await User({ username, email, password });
  if (!newUser) throw new Error("User not created"); // 400 Bad Request

  const savedUser = await newUser.save();
  savedUser.password = undefined;

  // return json response
  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  // check if user already exist
  const existingUser = await User.findOne({ username })
    .select("+password")
    .lean();
  if (!existingUser) throw new Error("User doesn't exists"); // 404 Not Found

  // compare password
  const isMatch = compareHash(password, existingUser.password);
  if (!isMatch) throw new Error("Wrong credentials"); // 400 Bad Request
  delete existingUser.password;

  // generate authentication token
  const token = generateToken(existingUser);

  // return json response
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
  });
};
