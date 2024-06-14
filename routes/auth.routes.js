const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { isAuthenticated } = require("./../middleware/jwt.middleware")

const saltRounds = 10;


router.post("/signup", (req, res) => {
  let { email, password, name, role } = req.body;
  if(email.includes("@dreamvoyage.com")){
    role= "admin"
  }

  // Check if the email, password or name are provided
  if (!email || !password || !name) {
    return res.status(400).json({ message: "Provide an email, password and name" });
  }

  // Use regex to validate the email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Provide a valid email" });
  }

  // Use regex to validate the password
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password must be at least 6 characters long and contain at least one number, one lowercase and one uppercase letter" });
  }

  // Check if the user already exists
  User.findOne({ email })
    .then((user) => {
      if (user) {
        // If the user with the same email already exists, send an error response
        
         res.status(400).json({ message: "Email already in use" });
         return 
      }

      // If the email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Create a new user in the database
      return User.create({ email, password: hashedPassword, name, role });
    })
    .then((createdUser) => {
      if (!createdUser) {
        // If user creation failed for any reason
        return res.status(500).json({ message: "User creation failed" });
      }

      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { email, name, _id, role } = createdUser;

      // Create a new object that doesn't expose the password
      const user = { email, name, _id, role };

      // Create an object that will be set as the token payload
      const payload = { email, role, name, _id };

      // Create and sign the token
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });

      // Send a json response containing the user object and authToken
     return res.status(201).json({ user, authToken });
    })
    .catch((err) => {
      console.log(err);
      // Ensure that an error response is sent only if no response has been sent yet
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
});



// POST /login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
 

  // Check if the email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Provide an email and password" });
  }

  //Check if user exists
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        // If user is not found, return an error message
        return res.status(401).json({ message: "User not found" });
      }

      // If user exists, check if provided password is correct
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      console.log(isPasswordCorrect)
      if (isPasswordCorrect) {
        // Deconstruct user object to omit the password
        const { email, role, name, _id } = user;

        // Create an object that will be set as the token payload
        const payload = { email, role, name, _id };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send a json response containing the token
        return res.status(200).json({ user:payload, authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate user " });
      }
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Internal Server Error", err: err.message })
    );
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
// router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE

//   // If JWT token is valid the payload gets decoded by the
//   // isAuthenticated middleware and made available on `req.payload`
//   console.log(`req.payload`, req.payload);

//   // Send back the object with user data
//   // previously set as the token payload
//   res.status(200).json(req.payload);
// });

// Export router
module.exports = router;