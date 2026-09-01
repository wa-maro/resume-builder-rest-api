import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION },
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
