// the asyncHandler function is a middleware that wraps around an async function
// and catches any errors that occur during the execution of the async function.
// This way, we don't have to write try-catch blocks in every async route handler.
// Instead, we can use the asyncHandler function to wrap around the async route handlers
// and catch any errors that occur during the execution of the async function.
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler; // Export the asyncHandler function
