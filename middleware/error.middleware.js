const { ZodError } = require("zod");

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server error"
  });
};

module.exports = errorMiddleware;