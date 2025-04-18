import { errorLogger } from "../utils/errorLoggers.util.js";

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const stack = process.env.NODE_ENV === "developmen" ? error.stack : undefined;

  // error logging
  errorLogger.error({
    message,
    statusCode,
    stack,
    route: req.originalUrl,
    method: req.method,
  });

  const resBody = {
    success: false,
    message,
    stack,
  };

  res.status(statusCode).json(resBody);
};

export default errorHandler;
