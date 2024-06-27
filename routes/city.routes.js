const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const City = require("../models/City.model");
const axios = require("axios");
const { rolesValidation } = require("../middleware/roles.middleware");
const { request } = require("../app");

// localhost:4010/Citys/

// router.get("/deals", async (req, res, next) => {

//     try {
//         const city = await City.find();

//         const count = req.query.count
//         const randomCity = []
//         for (let i = 0; i < count; i++) {
//             let random = Math.floor(Math.random() * (City.length - 1))
//             randomCity.push(City[random])
//         }

//         res.json(randomCity);


//     } catch (err) {
//         res.status(500).send(err);
//         next(err);
//     }
// })



router.get("/:id", async (req, res, next) => {

    try {

        const city = await City.findById(req.params.id);

        if (!city) {
            res.status(404).json({ message: "City not found" });
        } else {
            res.json(city);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
})



router.get('/', async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.destination) filter.name = req.query.destination;

        const cities = await City.find(filter);
        res.json(cities);
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
});



// Admin may modify user's role
router.post("/", isAuthenticated, rolesValidation(["admin"]), (req, res, next) => {
    City.create(req.body)
        .then((newCity) => {
            res.status(201).json(newCity);
        })
        .catch((err) => {
            next(err);
        });
});

// UPDATE/PUT 1-City/ID
router.put("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCity) {
            res.status(404).json({ message: "City not found" });
        } else {

            res.json(updatedCity);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});



router.delete("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        const deleteCity = await City.findByIdAndDelete(req.params.id);
        if (!deleteCity) {
            res.status(404).json({ message: "City not found" });
        } else {

            res.json(deleteCity);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});


module.exports = router;

