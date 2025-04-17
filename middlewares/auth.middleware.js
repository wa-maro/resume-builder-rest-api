import User from "../models/User.model.js";
import { verifyToken } from "../utils/jwt.util.js";

const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization.split(" ")[1];

  if (!authToken)
    return res.status(400).json({
      success: false,
      error: "Bad Request",
      message: "Authorization token is required",
    });

  try {
    // verify jwt token
    const isVerifiedUser = verifyToken(authToken);
    if (!isVerifiedUser)
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        message: "Unauthorized",
      });

    // check if user exists and attach user to request
    const user = await User.findById(isVerifiedUser.id).lean();
    if (!user)
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "User doesn't exists",
      });
    req.user = { id: user._id, email: user.email, username: user.username };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
