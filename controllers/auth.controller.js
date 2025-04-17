import User from "../models/User.model.js";
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

    // generate authentication token
    const token = generateToken(savedUser);

    // return json response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};
