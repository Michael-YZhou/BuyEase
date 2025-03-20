import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js"; // Import the Product model

/**
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // empty {} will fetch all products from the database
  res.json(products); // Send the products data as a JSON response
});

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // Find a product by id from the database
  if (product) {
    res.json(product); // If there is product, send the product data as a JSON response
  }
  res.status(404); // If product is not found, send a 404 status code
  throw new Error("Resource not found"); // and throw an error use asyncHandler to catch the error and pass it to the error handling middleware
});

export { getProducts, getProductById };
