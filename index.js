// server/index.js

const express = require("express");
const request = require("request");
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

const API_KEY = "2xbPkHlrLtyWfRQ7tw2dyA==zzglcyZcsk3PHeQ3";

let multer = require("multer");
let upload = multer();

function getCity(cityName) {
  let lat, lon;
  return request.get(
    {
      url: "https://api.api-ninjas.com/v1/city?name=" + cityName,
      headers: {
        "X-Api-Key": API_KEY,
      },
    },
    function (error, response, body) {
      if (error) return console.error("Request failed:", error);
      else if (response.statusCode != 200)
        return console.error(
          "Error:",
          response.statusCode,
          body.toString("utf8")
        );
      else {
        // let lat = response.body;
        let body = JSON.parse(response.body)[0];
        lat = body["latitude"];
        lon = body["longitude"];
      }
    }
  );
}

app.post("/city", upload.fields([]), (req, res) => {
  const cityName = req.body.cityName;
  // console.log("getCity: " + JSON.stringify(getCity(cityName)));
  // const lat = getCity(cityName)["lat"];
  // const lon = getCity(cityName)["lon"];
  // res.json({ success: "true", lat: lat, lon: lon });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
