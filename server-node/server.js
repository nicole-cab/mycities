// import modules
const express = require("express");
const { readFromFile } = require("./utils/fileUtils.js");

// import router module
const cityData = require("./routers/cityData.js");

// ----------

// create server
const app = express();

// static/public files served (react front-end)
app.use(express.static("../client-react/build"));

// middleware for encoding
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("user hit home page");
});

// set the port number
const PORT = 5000;

// ----------

// read the api keys
const apiKeysPath = "config.json";

let API_KEYS = {};

let result = readFromFile(apiKeysPath, "api_ninjas");
if (result.success) {
  console.log("ninja: ", result);
  API_KEYS.apiNinjas_API_KEY = result.data;
}
result = readFromFile(apiKeysPath, "open_weather");
if (result.success) {
  console.log("weather: ", result);
  API_KEYS.openWeather_API_KEY = result.data;
}

// ---------- routes

// only make routes available if the api keys are available
if (API_KEYS.apiNinjas_API_KEY && API_KEYS.openWeather_API_KEY) {
  // city data route
  app.use("/api/city_data", cityData(API_KEYS));
}

// ----------

app.listen(PORT, () => {
  console.log(`Server is listening on port number ${PORT}...`);
});
