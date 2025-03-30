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

// router is an instance of express.Router that we use to define our routes
const router = express.Router();

// import route handlers from the controller
// router.route() can define multiple actions on a single route
router.route("/").post(registerUser).get(getUsers); // Fetch all users
router.post("/logout", logoutUser); // Logout user
router.post("/login", authUser); // Login user
router
  .route("/profile")
  .get(getUserProfile) // Get user profile (user info is in the token, no need to pass it in the request)
  .put(updateUserProfile); // Update user profile
router
  .route("/:id")
  .get(getUserById) // Get user by ID
  .delete(deleteUser) // Delete user
  .put(updateUser); // Update user

export default router; // Export the router
