const express = require("express");
const router = express.Router();

const { getWeatherData } = require("../controllers/weather");

module.exports = function (API_KEY) {
  // pass the openWeather API key
  // get the weather data
  router.get(
    "/",
    (req, res, next) => {
      console.log("/api/weather used");
      req.API_KEY = API_KEY; // Pass the api key to the request object
      next(); // Move to the next middleware, the controller
    },
    getWeatherData
  );

  return router;
};
