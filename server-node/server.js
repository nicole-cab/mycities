// import modules
const express = require("express");
const fs = require("fs");
const https = require("https");

// import utils
const { readFromFile } = require("./utils/fileUtils.js");

// import router modules
const weather = require("./routers/weather.js");
const time = require("./routers/time.js");
const currency = require("./routers/currency.js");

const cityData = require("./routers/cityData.js");

// ----------

// create server
const app = express();

// change react project folder name
// static/public files served (react front-end)
app.use(express.static("../client-react/build"));

// middleware for encoding
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  console.log("user hit home page");
});

app.get("/hello", (req, res) => {
  res.json({ msg: "hello world" });
});

// set the port number
const PORT = 5000;

// ----------

// read the api keys
const apiKeysPath = "config.json";
let result = readFromFile(apiKeysPath, "api_ninjas");

let API_KEYS = {};

let apiNinjas_API_KEY, openWeather_API_KEY;
if (result.success) {
  console.log("ninja: ", result);
  apiNinjas_API_KEY = result.data;
  API_KEYS.apiNinjas_API_KEY = apiNinjas_API_KEY;
}
result = readFromFile(apiKeysPath, "open_weather");
if (result.success) {
  console.log("weather: ", result);
  openWeather_API_KEY = result.data;
  API_KEYS.openWeather_API_KEY = openWeather_API_KEY;
}

// ---------- routes

// only make routes available if the api keys are available
if (apiNinjas_API_KEY && openWeather_API_KEY) {
  // weather route
  app.use("/api/weather", weather(openWeather_API_KEY));
  // time route
  app.use("/api/time", time(apiNinjas_API_KEY));
  // currency
  app.use("/api/currency", currency(apiNinjas_API_KEY));

  app.use("/api/city_data", cityData(API_KEYS));
}

// ----------

app.listen(PORT, () => {
  console.log(`Server is listening on port number ${PORT}...`);
});
