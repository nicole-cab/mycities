// import modules
const express = require("express");
const fs = require("fs");
const https = require("https");

// import utils
const { readFromFile } = require("./utils/fileUtils.js");

// import router modules
const weather = require("./routers/weather.js");

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
const PORT = process.env.PORT || 5000;

// ----------

// read the api keys
const apiKeysPath = "config.json";
let result = readFromFile(apiKeysPath, "api_ninjas");
let apiNinjas_API_KEY, openWeather_API_KEY;
if (result.success) {
  console.log("ninja: ", result);
  apiNinjas_API_KEY = result.data;
}
result = readFromFile(apiKeysPath, "open_weather");
if (result.success) {
  console.log("weather: ", result);
  openWeather_API_KEY = result.data;
}

// ---------- routes

// weather route
app.use("/api/weather", weather(openWeather_API_KEY));

// ----------

app.listen(PORT, () => {
  console.log(`Server is listening on port number ${PORT}...`);
});
