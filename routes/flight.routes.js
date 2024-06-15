const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Flight = require("../models/Flight.model");
const axios = require("axios");
const { rolesValidation } = require("../middleware/roles.middleware");




// localhost:4010/flights/

router.get("/:id", async (req, res, next) => {

    try {
        const flight = await Flight.findById(req.params.id);

        if (!flight) {
            res.status(404).json({ message: "Flight not found" });
        } else {
            res.json(flight);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
})



router.get('/', async (req, res, next) => {
    try {
        const filter = {};

        if (req.query.flyFrom) filter.city = req.query.flyFrom;
        if (req.query.flyTo) filter.destinationCity = req.query.flyTo;
        if (req.query.departing) filter.departureDate = req.query.departing;
        if (req.query.returning) filter.returnDate = req.query.returning;
        if (req.query.tripType) filter.oneWay = req.query.tripType === "return" ? "false" : "true";
        console.log(req.query.passengers)
        const countOfPassengers = (+req.query?.passengers?.adults) + (+req.query?.passengers?.childrens)

        const flights = await Flight.find(filter);
        if (countOfPassengers && flights.capacities < countOfPassengers) {
            res.json({ message: "no seats" })

        }

        res.json(flights);
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
});



// Admin may modify user's role
router.post("/", isAuthenticated, rolesValidation(["admin"]), (req, res) => {
    Flight.create(req.body)
        .then((newFlight) => {
            res.status(201).json(newFlight);
        })
        .catch((err) => {
            next(err);
        });
});

// UPDATE/PUT 1-flight/ID
router.put("/:id", async (req, res, next) => {
    try {
        const flights = await Flight.findByIdAndUpdate(req.params.id, flights, { new: true, runValidators: true });
        if (!updatedFlight) {
            res.status(404).json({ message: "Flight not found" });
        } else {
            res.json(updatedflights);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});


module.exports = router;

