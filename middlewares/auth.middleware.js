import User from "../models/User.model.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../utils/customErrors.util.js";
import { verifyToken } from "../utils/jwt.util.js";

const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : "";

  if (!authToken)
    return next(new BadRequestError("Authorization token is required"));

  try {
    const isVerifiedUser = verifyToken(authToken);
    if (!isVerifiedUser) return next(new UnauthorizedError("Not authorized"));

    const user = await User.findById(isVerifiedUser.id).lean();
    if (!user) return next(new NotFoundError("User doesn't exists"));
    req.user = { id: user._id, email: user.email, username: user.username };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
