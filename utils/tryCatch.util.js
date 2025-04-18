const tryCatch =
  (controllerFunc, controllerName = "UnnamedController") =>
  async (req, res, next) => {
    try {
      await controllerFunc(req, res, next);
    } catch (error) {
      error.message = `[${controllerName}] ${error.message}`;
      next(error);
    }
  };

export default tryCatch;
