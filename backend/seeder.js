import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // delete all existing data before importing new data
    await Order.deleteMany(); // Order.deleteMany() deletes all documents in the Order collection
    await Product.deleteMany();
    await User.deleteMany();

    // insert users into the database and return the created users from the database as an array
    const createdUsers = await User.insertMany(users);
    // get the admin user. use the admin user to create products
    const adminUser = createdUsers[0]._id;
    // bring in the products and add the admin user _id to each product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    // insert the sample products into the database
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit(0); // exit the process with success
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // exit the process with failure
  }
};

const destroyData = async () => {
  try {
    // delete all existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit(0); // exit the process with success
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // exit the process with failure
  }
};

// check if the command line argument is equal to '-d' to destroy data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  // import data
  importData();
}
