import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from a .env file into process.env
import products from "./data/products.js";

const port = process.env.PORT || 5000; // Default port is 5000

// Create an express app
const app = express();

// Create a route for the homepage
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Create a route for getting all products
app.get("/api/products", (req, res) => {
  res.json(products); // Send the products data as a JSON response
});

// Create a route for getting a product by id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
