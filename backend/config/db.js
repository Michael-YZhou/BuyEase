import mongoose from "mongoose";

// This function is used to connect to the MongoDB database
// Call this function at the beginning of the server.js file

// It is an async function because the response from the database is a promise
const connectDB = async () => {
  try {
    // Connect to the MongoDB database using mongoose and the MONGO_URI from the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
