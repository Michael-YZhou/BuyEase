import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js"; // Import the Product model
import generateToken from "../utils/generateToken.js"; // Import the generateToken function

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
    // The generateToken method is a custom method defined in the User model that generates a JWT token
    generateToken(res, user._id); // Set the JWT in a cookie
    res.status(200).json({
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
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  // Check if the user already exists in the database
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Create a new user if it doesn't exist
  const user = await User.create({ name, email, password });

  if (user) {
    // If user is created successfully, send user data and token
    generateToken(res, user._id); // Set the JWT in a cookie

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
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

  res.status(200).json({ message: "Logged out successfully" });
});

/**
 * @desc Get user profile (user info is in the token, no need to pass it in the request)
 * @route GET /api/users/profile
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  // The req.user object is populated by the protect middleware after verifying the token
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  // The req.user object is populated by the protect middleware after verifying the token
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name; // Update name if provided, otherwise keep the existing name
    user.email = req.body.email || user.email; // Update email if provided, otherwise keep the existing email

    if (req.body.password) {
      user.password = req.body.password; // Update password if provided
    }

    const updatedUser = await user.save(); // Save the updated user to the database

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
