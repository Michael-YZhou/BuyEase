import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

const genetateToken = (res, userId) => {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); // Generate JWT token
  // Set the JWT in a cookie with options
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true if in production to use secure cookies with HTTPS
    sameSite: "Strict", // Set SameSite attribute to Strict to prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // Set cookie expiration to 30 days in milliseconds
  });
};

export default genetateToken;
