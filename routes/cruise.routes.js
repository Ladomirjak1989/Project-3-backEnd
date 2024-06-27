const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Cruise = require("../models/Cruise.model");
const axios = require("axios");
const { rolesValidation } = require("../middleware/roles.middleware");


// localhost:4010/Cruises/

// router.get("/deals", async (req, res, next) => {

//     try {
//         const cruise = await Cruise.find();

//         const count = req.query.count
//         const randomCruise = []
//         for (let i = 0; i < count; i++) {
//             let random = Math.floor(Math.random() * (cruise.length - 1))
//             randomCruise.push(cruise[random])
//         }

//         res.json(randomCruise);


//     } catch (err) {
//         res.status(500).send(err);
//         next(err);
//     }
// })



router.get("/:id", async (req, res, next) => {

    try {
        const cruise = await Cruise.findById(req.params.id);

        if (!Cruise) {
            res.status(404).json({ message: "Cruise not found" });
        } else {
            res.json(cruise);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
})



router.get('/', async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.destination) filter.destination = req.query.destination;
        if (req.query.departure) filter.departure = req.query.departure;
        if (req.query.duration) filter.duration = `${req.query.duration} nights`;
        const cruises = await Cruise.find(filter);
      
      

        res.json(cruises);
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
});



// Admin may modify user's role
router.post("/", isAuthenticated, rolesValidation(["admin"]), (req, res, next) => {
    Cruise.create(req.body)
        .then((newCruise) => {
            res.status(201).json(newCruise);
        })
        .catch((err) => {
            next(err);
        });
});

// UPDATE/PUT 1-Cruise/ID
router.put("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        const updatedCruise = await Cruise.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCruise) {
            res.status(404).json({ message: "Cruise not found" });
        } else {

            res.json(updatedCruise);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});



router.delete("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        const deleteCruise = await Cruise.findByIdAndDelete(req.params.id);
        if (!deleteCruise) {
            res.status(404).json({ message: "Cruise not found" });
        } else {

            res.json(deleteCruise);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});


module.exports = router;

