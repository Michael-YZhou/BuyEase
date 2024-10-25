import mongoose from "mongoose";

// Create a review schema
// reviewSchema is a sub-document schema of productSchema
const reviewSchema = mongoose.Schema(
  {
    // user who created the review. This is coming from the User model(collection)
    user: {
      type: mongoose.Schema.Types.ObjectId, // user id is a mongoose object id type. _id
      required: true,
      ref: "User", // reference to the User model where the user id is coming from
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    // Add created at and updated at timestamps field to the review automatically when created or updated
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    // user who created the product. This is coming from the User model(collection)
    user: {
      type: mongoose.Schema.Types.ObjectId, // user id is a mongoose object id type. _id
      required: true,
      ref: "User", // reference to the User model where the user id is coming from
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema], // reviews is an array of reviewSchema objects (sub-document schema)
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    // Add created at and updated at timestamps field to the product automatically when created or updated
    timestamps: true,
  }
);

// Create a model from the schema and export it
const Product = mongoose.model("Product", productSchema);

export default Product;
