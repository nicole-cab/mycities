const time = require("../routers/time");
const httpsRequest = require("../utils/httpsRequests");

const getTimeDataByCityName = (cityName, countryCode = "", API_KEY) => {
  console.log("city2: ", cityName, countryCode);

  // if the countryCode is provided added to the path
  let path = "/v1/worldtime?city=" + cityName;

  //   if (countryCode !== "") {
  //     path += "," + countryCode;
  //   }
  //   path += "&appid=" + API_KEY;

  console.log("path: ", path);

  // use the openWeather API - get weather data by city name and optional country code
  const options = {
    hostname: "api.api-ninjas.com",
    port: 443,
    path: path,
    headers: {
      "X-Api-Key": API_KEY,
    },
  };

  const promise = httpsRequest(options);

  promise
    .then((response) => JSON.parse(response))
    .then((data) => {
      console.log(data);
      // gets the current time given a timezone
      const timezone = data.timezone;
      let date_string = new Date().toLocaleString("en-UK", {
        timeZone: timezone,
      });
      console.log("data string: ", date_string);
    })
    .catch((error) => console.log(error));

  return promise;
};

module.exports = { getTimeDataByCityName };
