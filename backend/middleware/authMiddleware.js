import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/userModel.js";

/* 
this is a protect middleware to protect private routes
his middleware checks if the user is authenticated by verifying the JWT token
and attaches the user information to the request object if authenticated
*/
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt; // Get token from cookies

  // Check if token is present
  if (token) {
    try {
      const decodedTocken = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
      req.user = await User.findById(decodedTocken.userId).select("-password"); // Find the user by ID and exclude the password field and attach it to the request object
      next(); // Hand the request to the next middleware or route handler
    } catch {
      // If there is tocken but the token is not valid, send unauthorized error
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    // If there is no token, send unauthorized error
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

/*
this is an admin middleware to protect admin routes
this middleware checks if the user is an admin by checking the isAdmin field in the user object
and allows access to the route if the user is an admin
*/
