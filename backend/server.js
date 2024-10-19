import express from "express";
const port = 5000;

// Create an express app
const app = express();

// Create a route for the homepage
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
