import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// Add a method to the schema which will compare the entered password with the hashed password in the database
// This method will be used to authenticate the user during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a model from the schema and export it
const User = mongoose.model("User", userSchema);

export default User;
