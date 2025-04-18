import User from "../models/User.model.js";
import { verifyToken } from "../utils/jwt.util.js";

const authenticate = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";

    if (!authToken) throw new Error("Authorization token is required"); // 400 Bad Request

    // verify jwt token
    const isVerifiedUser = verifyToken(authToken);
    if (!isVerifiedUser) throw new Error("Not authorized"); // 401 Unauthorized

    // check if user exists and attach user to request
    const user = await User.findById(isVerifiedUser.id).lean();
    if (!user) throw new Error("User doesn't exists"); // 404 Not Found

    req.user = { id: user._id, email: user.email, username: user.username };

    next();
  } catch (error) {
    console.error(`${req.method} ${req.originalUrl}`);
    console.error("Error Message:", error.message);
    next(error);
  }
};

export default authenticate;
