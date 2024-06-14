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
        const flights = await Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
});



// Admin may modify user's role
router.post("/",isAuthenticated, rolesValidation(["admin"]), (req, res) =>  {



    Flight.create(req.body)
        .then((newFlight) => {
            res.status(201).json(newFlight);
        })
        .catch((err) => {
            next(err);
        });
});

// UPDATE/PUT 1-flight/ID
router.put("/:id", async(req, res, next) => {
    try {
        const flights = await Flight.findByIdAndUpdate(req.params.id, flights,{ new: true, runValidators: true });
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














//                 },
//                 // params: {
//                 //   origin: 'NYC', // Replace with your origin airport code
//                 //   maxPrice: 200 // Replace with your maximum price
//                 // }
//             })
//             const data = await response.data.data
//             console.log(data)
//             const newData = await data.map(item => {
//                 return {
//                     ...item, price: item.price.total,
//                     flightDates: item.links.flightDates,
//                     flightOffers: item.links.flightOffers
//                 }

//             })
//             const flight = await Flight.insertMany(newData)
//             res.json(flight)

//         }
//     } catch (error) {
//         console.error('Error fetching the token:', error);
//     }
// })

//module.exports = router;