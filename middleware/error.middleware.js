const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Server error"
  });
};

module.exports = errorMiddleware;