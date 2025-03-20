// this will be called when no other error handling middleware is called
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // create a new error object with a message that includes the original URL
  res.status(404); // set the status code to 404
  next(error); // pass the error to the error handling middleware
};

// overwrite the default Express error handler to provide a custom error message
// pass in the error, request, response, and next middleware function
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // set the status code to the response status code or 500
  let message = err.message; // set the message to the error message

  // if the error is a CastError and the kind is ObjectId
  // which means the object id is not found
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resource not found"; // set the message to 'Resource not found'
    statusCode = 404; // set the status code to 404
  }

  // send the response with the status code and message
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

export { notFound, errorHandler }; // export the notFound and errorHandler middleware functions
