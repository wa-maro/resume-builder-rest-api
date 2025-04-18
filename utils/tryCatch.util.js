const tryCatch =
  (controllerFunc, controllerName = "UnnamedController") =>
  async (req, res, next) => {
    try {
      await controllerFunc(req, res, next);
    } catch (error) {
      console.error(`[${controllerName}] ${req.method} ${req.originalUrl}`);
      console.error("Error Message:", error.message);
      next(error);
    }
  };

export default tryCatch;
