// server/index.js

const express = require("express");
const app = express();

app.use(express.static("mycities-project/dist"));

const PORT = process.env.PORT || 3001;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// // connect to mysql db
// const db = require("./db");

// // get db connection
// const con = db.connectDB();

// --------------------------------------------------
const multer = require("multer");
const upload = multer();
const https = require("https");
const fs = require("fs");

// cityInfo json
const cityInfoPath = "cityInfo.json";

// read the keys from the api_keys.json file
const apiKeysPath = "api_keys.json";
const apiNinjas_API_KEY = readFromFile(apiKeysPath, "api_ninjas");
const openWeather_API_KEY = readFromFile(apiKeysPath, "open_weather");

function readFromFile(path, key) {
  try {
    // read the json
    let json = fs.readFileSync(path);
    json = JSON.parse(json);
    console.log("> Data successfully READ from file");
    // return value of key
    return json[key];
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

console.log("api-ninjas: ", apiNinjas_API_KEY);
console.log("open_weather: ", openWeather_API_KEY);

function appendToFile(path, key, value) {
  // create file if it doesn't already exist and add the city info
  try {
    let json;
    // read the json file if it exists or else create one
    if (fs.existsSync(path)) {
      json = fs.readFileSync(path);
      json = JSON.parse(json);
    } else {
      json = {};
    }

    // append new key-value pair
    json[key] = value;

    // update json with new key-value pair
    fs.writeFileSync(path, JSON.stringify(json), "utf8");
    console.log("> File UPDATED successfully");
  } catch (error) {
    console.log("An error has occurred ", error);
  }
}

app.post("/city", upload.fields([]), (req, res) => {
  const cityName = req.body.cityName;

  console.log("openweather: ", openWeather_API_KEY);
  // get country from city api then the weather from the weather api
  getCity(cityName);
});

function getCity(cityName) {
  // use the Api Ninjas City API
  const options = {
    hostname: "api.api-ninjas.com",
    port: 443,
    path: "/v1/city?name=" + cityName,
    headers: {
      "X-Api-Key": apiNinjas_API_KEY,
    },
  };
  https
    .get(options, function (res) {
      let data = "";

      // a chunk of data has been received
      res.on("data", (chunk) => {
        data += chunk;
      });

      // the whole response has been received
      res.on("end", () => {
        // parse data
        let body = JSON.parse(data)[0];
        console.log("city api: ", body);

        console.log("SUCCESSFULLY USED CITY API");

        // save country to json file
        appendToFile(cityInfoPath, "country_code", body.country);

        // get weather of city from weather api
        getWeather(cityName);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

function getWeather(cityName) {
  // get country code from json file
  let countryCode = readFromFile(cityInfoPath, "country_code");

  // use the openWeather API
  const options = {
    hostname: "api.openweathermap.org",
    port: 443,
    path:
      "/data/2.5/weather?q=" +
      cityName +
      "," +
      countryCode +
      "&appid=" +
      openWeather_API_KEY,
  };

  https
    .get(options, function (res) {
      let data = "";

      // a chunk of data has been received
      res.on("data", (chunk) => {
        data += chunk;
      });

      // the whole response has been received
      res.on("end", () => {
        // parse data
        let body = JSON.parse(data);
        console.log(body);

        console.log("SUCCESSFULLY USED WEATHER API");

        // save/append weather data to json file
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
