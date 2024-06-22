const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Vacation = require("../models/Vacation.model");
const axios = require("axios");
const { rolesValidation } = require("../middleware/roles.middleware");
const { request } = require("../app");




// localhost:4010/Vacations/

router.get("/deals", async (req, res, next) => {

    try {
        const vacation = await Vacation.find();
   
        const count = req.query.count
        const randomVacation = []
        for (let i = 0; i < count; i++) {
            let random = Math.floor(Math.random() * (vacation.length - 1))
            randomVacation.push(vacation[random])
        }
     
        res.json(randomVacation);
        

    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
})



router.get("/:id", async (req, res, next) => {

    try {
        const vacation = await Vacation.findById(req.params.id);

        if (!vacation) {
            res.status(404).json({ message: "Vacation not found" });
        } else {
            res.json(vacation);
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
        if (req.query.duration) filter.duration = `${req.query.duration} nights`;
        const vacations = await Vacation.find(filter);
        


        res.json(vacations);
    } catch (err) {
        res.status(500).send(err);
        next(err);
    }
});



// Admin may modify user's role
router.post("/", isAuthenticated, rolesValidation(["admin"]), (req, res, next) => {

    Vacation.create(req.body)
        .then((newVacation) => {
            res.status(201).json(newVacation);
        })
        .catch((err) => {
            next(err);
        });
});

// UPDATE/PUT 1-Vacation/ID
router.put("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        
        const updatedVacation = await Vacation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedVacation) {
            res.status(404).json({ message: "Vacation not found" });
        } else {

            res.json(updatedVacation);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});


router.delete("/:id", isAuthenticated, rolesValidation(["admin"]), async (req, res, next) => {

    try {
        const deleteVacation = await Vacation.findByIdAndDelete(req.params.id);
        if (!deleteVacation) {
            res.status(404).json({ message: "Vacation not found" });
        } else {

            res.json(deleteVacation);
        }
    } catch (err) {
        res.status(500).send(err);
        next(err);
    };
});


module.exports = router;

