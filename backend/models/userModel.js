import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }, // set isAdmin to false by default for new users. Need to get into database to change it to true.
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema and export it
const User = mongoose.model("User", userSchema);

export default User;
