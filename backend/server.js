import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from a .env file into process.env
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000; // Default port is 5000

connectDB(); // Connect to the MongoDB database

// Create an express app
const app = express();

// Create a route for the homepage
app.get("/", (req, res) => {
  res.send("API is running...");
});

// the /api/products route is handled by the productRoutes router
app.use("/api/products", productRoutes);

// Middleware to handle errors for routes that are not found
app.use(notFound);

// Middleware to handle errors for all routes
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
