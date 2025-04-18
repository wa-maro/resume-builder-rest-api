const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const stack =
    process.env.NODE_ENV === "development" ? error.stack : undefined;

  const resBody = {
    success: false,
    message,
    stack,
  };

  res.status(statusCode).json(resBody);
};

export default errorHandler;
