## User Auth

### Steps

1. Create the Auth routers
   - Create the Auth routes (user login, user register, use logout etc.) at backend and verify API connection use Postman.
   - Use middleware to parse response body:

   ```js
   app.use(express.json()); // Parse raw JSON bodies (as sent by API clients)
   
   app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (as sent by HTML forms)
   ```

2. Check whether username & password exist (use bcrypt to hash the user input password before compare to database hash password)

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

3. After user login, create a JWT and set it in a cookie. Send it back to client with the response. Else if user unauthorised throw an error and pass on to the error-handling middleware.

   ```js
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
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         // token: user.getSignedJwtToken(), // Don't send the token in the response, instead send it in the cookie
       });
     } else {
       // If user doesn't exist or password doesn't match, send an error response
       res.status(401);
       throw new Error("Invalid email or password");
     }
   });
   ```

   
