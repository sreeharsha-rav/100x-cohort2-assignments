// This middleware is used to validate the request body against the schema provided
const validateRequest = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parseAsync(req.body);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }
    next(error);
  }
};

module.exports = validateRequest;
