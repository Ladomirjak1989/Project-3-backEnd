const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Hotel = require("../models/Hotel.model");
const axios = require("axios");
const { rolesValidation } = require("../middleware/roles.middleware");
const { request } = require("../app");

// localhost:4010/Hotels/

// router.get("/deals", async (req, res, next) => {

//     try {
//         const hotel = await Hotel.find();

//         const count = req.query.count
//         const randomHotel = []
//         for (let i = 0; i < count; i++) {
//             let random = Math.floor(Math.random() * (Hotel.length - 1))
//             randomHotel.push(Hotel[random])
//         }

//         res.json(randomHotel);


//     } catch (err) {
//         res.status(500).send(err);
//         next(err);
//     }
// })



router.get("/:id", async (req, res, next) => {

    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            res.status(404).json({ message: "Hotel not found" });
        } else {
            res.json(hotel);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
})



router.get('/', async (req, res, next) => {
    try {
        
        if (req.query.destination) {
            const filter = {};
            const array = req.query.destination.split(", ")
            if (array[0]) {
                filter['location.city'] = array[0];
            }
            if (array[1]) {
                filter['location.country'] = array[1];
            }
            const hotels = await Hotel.find(filter);
          
          
            res.json(hotels);

        } 
        else{
            const hotels = await Hotel.find();
            res.json(hotels);
        }
        // if (req.query.duration) filter.duration = `${req.query.duration} nights`;
       
       
       
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
});



// Admin may modify user's role
router.post("/", isAuthenticated, rolesValidation(["admin"]), (req, res, next) => {
    Hotel.create(req.body)
        .then((newHotel) => {
            res.status(201).json(newHotel);
        })
        .catch((err) => {
            next(err);
        });
});

// UPDATE/PUT 1-Hotel/ID
router.put("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedHotel) {
            res.status(404).json({ message: "Hotel not found" });
        } else {

            res.json(updatedHotel);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});



router.delete("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deleteHotel) {
            res.status(404).json({ message: "Hotel not found" });
        } else {

            res.json(deleteHotel);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});


module.exports = router;

