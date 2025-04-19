import { ValidationError } from "../utils/customErrors.util.js";

const validate =
  ({ body, params }) =>
  (req, res, next) => {
    try {
      // validate and sanitize request body
      if (body) {
        const { error, value } = body.validate(req.body, {
          abortEarly: false,
        });

        if (error)
          throw new ValidationError("Invalid request body", error.details);

        req.body = value;
      }

      // validate and sanitize request params
      if (params) {
        const { error, value } = params.validate(req.params, {
          abortEarly: false,
        });

        if (error)
          throw new ValidationError("Invalid request params", error.details);

        req.params = value;
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
