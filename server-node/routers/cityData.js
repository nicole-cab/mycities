const express = require("express");

const router = express.Router();

// get controller
const { getCityData } = require("../controllers/cityData");

module.exports = function (API_KEYS) {
  console.log("/api/city_data used");
  // pass the api ninjas API key
  // get the time data
  router.get(
    "/",
    (req, res, next) => {
      // Pass the api keys to the request object
      req.apiNinjas_API_KEY = API_KEYS.apiNinjas_API_KEY;
      req.openWeather_API_KEY = API_KEYS.openWeather_API_KEY;
      console.log("API_KEYS: ", API_KEYS);

      next(); // Move to the next middleware, the controller
    },
    getCityData
  );
  return router;
};
