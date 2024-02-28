const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    
    error.message = err.message;

  //Log to console for the developer
  console.log(err.stack.red);

  // Mongoose bad ObjectID
  if (err.name === 'CastError') {
      const message = `Bootcamp with id ${err.value} not found.`;
      error = new ErrorResponse(message, 404)
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server error' });
};

module.exports = errorHandler;
