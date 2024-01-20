const express = require("express");

const router = express.Router();

const { getTimeData } = require("../controllers/time");

module.exports = function (API_KEY) {
  console.log("/api/time used");
  // pass the api ninjas API key
  // get the time data
  router.get(
    "/",
    (req, res, next) => {
      req.API_KEY = API_KEY; // Pass the api key to the request object
      next(); // Move to the next middleware, the controller
    },
    getTimeData
  );
  return router;
};
