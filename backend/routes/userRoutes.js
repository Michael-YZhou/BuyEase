import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController.js"; // Import user controller functions
import { protect, admin } from "../middleware/authMiddleware.js"; // Import middleware for authentication and authorization

// router is an instance of express.Router that we use to define our routes
const router = express.Router();

// import route handlers from the controller
// router.route() can define multiple actions on a single route
// add the protect middleware to the routes that require authentication
// and the admin middleware to the routes that require admin privileges
router.route("/").post(registerUser).get(protect, admin, getUsers); // Fetch all users
router.post("/logout", logoutUser); // Logout user
router.post("/login", authUser); // Login user
router
  .route("/profile")
  .get(protect, getUserProfile) // Get user profile (user info is in the token, no need to pass it in the request)
  .put(protect, updateUserProfile); // Update user profile
router
  .route("/:id")
  .get(protect, admin, getUserById) // Get user by ID
  .delete(protect, admin, deleteUser) // Delete user
  .put(protect, admin, updateUser); // Update user

export default router; // Export the router
