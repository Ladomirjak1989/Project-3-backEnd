const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");
// const Flight = require("../models/Flight.model");
const axios = require("axios");
const { rolesValidation } = require("../middleware/roles.middleware");



router.get('/', async (req, res, next) => {
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
});
module.exports = router;