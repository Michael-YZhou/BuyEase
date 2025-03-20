import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts); // Fetch all products
router.route("/:id").get(getProductById); // Fetch single product

export default router; // Export the router
