import User from "../models/User.model.js";
import { compareHash } from "../utils/hashing.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // check if user already exist
    const existingUser = await User.findOne({ username, email });
    if (existingUser)
      return res.status(409).json({
        success: false,
        error: "Conflict",
        message: "User already exists",
      });

    // create user and save it
    const newUser = await User({ username, email, password });
    if (!newUser)
      return res.status(409).json({
        success: false,
        error: "Bad Request",
        message: "User not created",
      });
    const savedUser = await newUser.save();
    savedUser.password = undefined;

    // return json response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // check if user already exist
    const existingUser = await User.findOne({ username })
      .select("+password")
      .lean();
    if (!existingUser)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "User doesn't exists",
      });

    // compare password
    const isMatch = compareHash(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        message: "Wrong credentials",
      });
    delete existingUser.password;

    // generate authentication token
    const token = generateToken(existingUser);

    // return json response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};
