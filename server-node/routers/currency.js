const express = require("express");

const router = express.Router();

const { getCurrencyData } = require("../controllers/currency");

module.exports = function (API_KEY) {
  console.log("/api/currency used");
  // pass the api ninjas API key
  // get the time data
  router.get(
    "/",
    (req, res, next) => {
      req.API_KEY = API_KEY; // Pass the api key to the request object
      next(); // Move to the next middleware, the controller
    },
    getCurrencyData
  );
  return router;
};
