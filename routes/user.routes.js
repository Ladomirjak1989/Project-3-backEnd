
// `${API_URL}/users/${user._id}/flight/${id}`


const express = require("express");
const router = express.Router();
const User = require("./../models/User.model")
const { isAuthenticated } = require("./../middleware/jwt.middleware")


// localhost:4010/users/:userId/flights/:flightId
router.post("/:userId/flights/:flightId", (req, res, next) => {
    const { userId, flightId } = req.params;
  
    User.findByIdAndUpdate(
      userId,
      { $push: { flights: flightId } }, // Add the flight ID to the flights array
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }
        res.status(201).json(updatedUser);
      })
      .catch((err) => {
        next(err);
      });
  });


module.exports = router;

