# User Auth (with JWT)

## Login Steps

1. **Create** the **Auth routers**
   
   - Create the Auth routes (user login, user register, use logout etc.) at backend and verify API connection use Postman.
   - Use middleware to parse response body:
   
   ```js
   app.use(express.json()); // Parse raw JSON bodies (as sent by API clients)
   
   app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
   ```
   
2. **Check** whether **username & password** exist (use bcrypt to hash the user input password before compare to database hash password)

   ```bash
   npm install bcryptjs
   ```

   ```js
   // add a function for comparing password on the userSchema
   userSchema.methods.matchPassword = async function (enteredPassword) {
     return await bcrypt.compare(enteredPassword, this.password);
   };
   
   // call the matchPassword function in the login route
   if (user && (await user.matchPassword(password))) {
     // log in user
   }
   ```

3. After user login, **create** a **JWT** and **set it in a cookie**. Send it back to client with the response. Else if user unauthorised throw an error and pass on to the error-handling middleware.

   ```js
   // in userController.js
   const authUser = asyncHandler(async (req, res) => {
       const { email, password } = req.body;
   
       const user = await User.findOne({ email: email });
   
       if (user && (await user.matchPassword(password))) {
           // If user exists and password matches, send user data and token
           // The getSignedJwtToken method is a custom method defined in the User model that generates a JWT token
           const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
               expiresIn: "30d",
           }); // Generate JWT token
           // Set the JWT in a cookie with options
           res.cookie("jwt", token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === "production", // Set to true if in production to use secure cookies with HTTPS
               sameSite: "Strict", // Set SameSite attribute to Strict to prevent CSRF attacks
               maxAge: 30 * 24 * 60 * 60 * 1000, // Set cookie expiration to 30 days in milliseconds
           });
           res.json({
               // your json response
               message: "You have been logged in"
           });
       } else {
           // If user doesn't exist or password doesn't match, send an error response
           res.status(401);
           throw new Error("Invalid email or password");
       }
   });
   ```
   
4. Since the token is in the cookie, all future requests will contain this JWT in the cookie for authentication.

   **Create** **authMiddleware** at the backend to protect private routes and Admin routes by verify the token:

   ```js
   // in authMiddleware.js
   import jwt from "jsonwebtoken";
   import asyncHandler from "./asyncHandler.js";
   import User from "../models/userModel.js";
   
   /* 
   this is a protect middleware to protect private routes
   his middleware checks if the user is authenticated by verifying the JWT token
   and attaches the user information to the request object if authenticated
   */
   const protect = asyncHandler(async (req, res, next) => {
       let token;
   
       token = req.cookies.jwt; // Get token from cookies
   
       // Check if token is present
       if (token) {
           try {
               const decodedTocken = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key
               req.user = await User.findById(decodedTocken.userId).select("-password"); // Find the user by ID and exclude the password field and attach it to the request object
               next(); // Hand the request to the next middleware or route handler
           } catch {
               // If there is tocken but the token is not valid, send unauthorized error
               res.status(401);
               throw new Error("Not authorized, token failed");
           }
       } else {
           // If there is no token, send unauthorized error
           res.status(401);
           throw new Error("Not authorized, no token");
       }
   });
   
   /*
   this is an admin middleware to protect admin routes
   this middleware checks if the user is an admin by checking the isAdmin field in the user object
   and allows access to the route if the user is an admin
   */
   
   const admin = (req, res, next) => {
       if (req.user && req.user.isAdmin) {
           next(); // If user is admin, hand the request to the next middleware or route handler
       } else {
           res.status(401); // If user is not admin, send unauthorized error
           throw new Error("Not authorized as an admin");
       }
   };
   
   export { protect, admin };
   
   ```

5. **Attach** the **authMiddleware** to the routes that need to be protected:

   ```js
   // in userRoutes.js
   import express from "express";
   import {
       authUser,
       registerUser,
       logoutUser,
       getUserProfile,
       updateUserProfile,
       getUsers,
       getUserById,
       deleteUser,
       updateUser,
   } from "../controllers/userController.js"; // Import user controller functions
   import { protect, admin } from "../middleware/authMiddleware.js"; // Import middleware for authentication and authorization
   
   // router is an instance of express.Router that we use to define our routes
   const router = express.Router();
   
   // import route handlers from the controller
   // router.route() can define multiple actions on a single route
   // add the protect middleware to the routes that require authentication
   // and the admin middleware to the routes that require admin privileges
   router.route("/").post(registerUser).get(protect, admin, getUsers); // Fetch all users
   router.post("/logout", logoutUser); // Logout user
   router.post("/login", authUser); // Login user
   router
       .route("/profile")
       .get(protect, getUserProfile) // Get user profile (user info is in the token, no need to pass it in the request)
       .put(protect, updateUserProfile); // Update user profile
   router
       .route("/:id")
       .get(protect, admin, getUserById) // Get user by ID
       .delete(protect, admin, deleteUser) // Delete user
       .put(protect, admin, updateUser); // Update user
   
   export default router; // Export the router
   
   ```

   

## Logout Steps

1. Destroy token in the request at the backend

   ```js
   // in userController.js
   const logoutUser = asyncHandler(async (req, res) => {
       res.cookie("jwt", "", {
           httpOnly: true,
           secure: process.env.NODE_ENV === "production",
           sameSite: "Strict",
           expires: new Date(0), // Set expiration date to the past to clear the cookie
       });
   
       res.status(200).json({ message: "Logged out successfully" });
   });
   ```



## Update User Detail

1. Create a Mongoose pre-save middleware in userModel.js to hash the password before send to MongoDB

   ```js
   // in userModel.js
   // Add a pre-save hook to the schema which will hash the password before saving it to the database
   userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) {
       return next(); // If not modifying password, skip hashing
     }
   
     const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds of hashing
     this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
   });
   ```

2. Implement the updateUserProfile controller in userController.js

   ```js
   /**
    * @desc Update user profile
    * @route PUT /api/users/profile
    * @access Private
    */
   const updateUserProfile = asyncHandler(async (req, res) => {
     // The req.user object is populated by the protect middleware after verifying the token
     const user = await User.findById(req.user._id);
   
     if (user) {
       user.name = req.body.name || user.name; // Update name if provided, otherwise keep the existing name
       user.email = req.body.email || user.email; // Update email if provided, otherwise keep the existing email
   
       if (req.body.password) {
         user.password = req.body.password; // Update password if provided
       }
   
       const updatedUser = await user.save(); // Save the updated user to the database
   
       res.status(200).json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
       });
     } else {
       res.status(404);
       throw new Error("User not found");
     }
   });
   ```

3. add the updateUserProfile controller to the /users/profile route when receive a PUT request.

   
