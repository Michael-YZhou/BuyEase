import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js"; // Import the Product model
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library

/**
 * @desc Auth uer & get token
 * @route GET /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    // If user exists and password matches, send user data and token
    // The getSignedJwtToken method is a custom method defined in the User model that generates a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    }); // Generate JWT token
    // Set the JWT in a cookie with options
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if in production to use secure cookies with HTTPS
      sameSite: "Strict", // Set SameSite attribute to Strict to prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // Set cookie expiration to 30 days in milliseconds
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // token: user.getSignedJwtToken(), // Don't send the token in the response, instead send it in the cookie
    });
  } else {
    // If user doesn't exist or password doesn't match, send an error response
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});

/**
 * @desc Logout user & clear cookie
 * @route Post /api/users/logout
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(0), // Set expiration date to the past to clear the cookie
  });

  // res.status(200).json({ message: "Logged out successfully" });
});

/**
 * @desc Get user profile (user info is in the token, no need to pass it in the request)
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get user profile");
});

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update user profile");
});

/**
 * @desc Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get all users");
});

/**
 * @desc Get user by ID
 * @route GET /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by ID");
});

/**
 * @desc Delete user
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

/**
 * @desc Update user
 * @route PUT /api/users/:id
 * @access Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
