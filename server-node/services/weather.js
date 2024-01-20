const https = require("https");

const getWeatherDataByCityName = (cityName, countryCode = "", API_KEY) => {
  console.log("city2: ", cityName, countryCode);

  // if the countryCode is provided added to the path
  let path = "/data/2.5/weather?q=" + cityName;
  if (countryCode !== "") {
    path += "," + countryCode;
  }
  path += "&appid=" + API_KEY;

  console.log("path: ", path);

  // use the openWeather API - get weather data by city name and optional country code
  const options = {
    hostname: "api.openweathermap.org",
    port: 443,
    path: path,
  };

  // make the api request
  return new Promise((resolve, reject) => {
    https
      .get(options, (res) => {
        let data = "";

        // a chunk of data has been received
        res.on("data", (chunk) => {
          data += chunk;
        });

        // the whole response has been received
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

module.exports = { getWeatherDataByCityName };
