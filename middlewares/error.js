const catchError = (err, req, res, next) => {
  const finalErr = { ...err };
  if (err.name === "Validation Error") {
    const errors = err.errors;
    const keys = Object.keys(errors);
    const errorObj = {};
    keys.map((key) => {
      errorObj[key] = errors[key].message;
      if (errorObj[key].kond === "enum") {
        errorObj[key] = "invalid enum value";
      }
    });
    finalErr.statusCode = 400;
    err.message = errorObj;
  }
  if (err.kind === "ObjectId") {
    err.statusCode = 400;
    err.message = "invalid id";
  }
  if (err.code === 11000) {
    err.statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    err.message = `${field} is duplicated`;
  }
  res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message || "internal error",
  });
};
module.exports = catchError;
