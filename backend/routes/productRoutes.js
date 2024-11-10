import express from "express";
import Product from "../models/productModel.js"; // Import the Product model
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// use asyncHandler to catch any errors that occur during the async operation without using try...catch
// Create a route for getting all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); // empty {} will fetch all products from the database
    console.log(products);
    res.json(products); // Send the products data as a JSON response
  })
);

// Create a route for getting a product by id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id); // Find a product by id from the database
    if (product) {
      res.json(product); // If there is product, send the product data as a JSON response
    }
    res.status(404); // If product is not found, send a 404 status code
  })
);

export default router; // Export the router
