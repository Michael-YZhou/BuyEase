import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

// router is an instance of express.Router that we use to define our routes
const router = express.Router();

// import route handlers from the controller
// router.route() can define multiple actions on a single route
router.route("/").get(getProducts); // Fetch all products
router.route("/:id").get(getProductById); // Fetch single product

export default router; // Export the router
