import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js"; // Import the Product model

/**
 * @desc Auth uer & get token
 * @route GET /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  res.send("Auth user");
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
  res.send("Logout user");
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
