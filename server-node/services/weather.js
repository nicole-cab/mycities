const httpsRequest = require("../utils/httpsRequests");
const fileUtils = require("../utils/fileUtils");

const getWeatherDataByCityName = async (
  cityName,
  countryCode = "",
  API_KEY
) => {
  console.log("city2: ", cityName, countryCode);

  // if the countryCode is provided added to the path
  let path = "/data/2.5/weather?q=" + cityName;
  if (countryCode !== "") {
    path += "," + countryCode;
  }

  // add the api key and make the units metric
  path += "&units=metric&appid=" + API_KEY;

  console.log("path: ", path);

  // use the openWeather API - get weather data by city name and optional country code
  const options = {
    hostname: "api.openweathermap.org",
    port: 443,
    path: path,
  };

  try {
    // make the api request
    const promise = await httpsRequest(options);
    const resData = JSON.parse(promise);
    console.log(resData);

    // check if the request was successful
    console.log(resData.cod);
    if (Number(resData.cod) === 200) {
      console.log("success");

      // extract some of the weather data
      await extractWeatherData(resData);

      // if city found and weather data successfully appended to file
      return { success: true, status: 200 };
    } else if (Number(resData.cod) === 404) {
      return { success: false, status: 404, message: resData.message }; // if city not found
    }

    return { success: false, message: resData.message }; // if api req fails (other status codes)
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message }; // if server fails
  }
};

async function extractWeatherData(resData) {
  console.log(resData);
  //extract the data we want
  const weatherData = {
    weather: {
      main: resData.weather[0].main,
      description: resData.weather[0].description,
    },
    main: {
      temp: resData.main.temp,
      feels_like: resData.main.feels_like,
      temp_min: resData.main.temp_min,
      temp_max: resData.main.temp_max,
    },
    country: resData.sys.country,
  };

  // append the data to the file
  const response = await fileUtils.appendToFile(
    "cityInfo.json",
    "weatherData",
    weatherData
  );

  // if append operation fails
  if (response.success === false) {
    throw new Error("could not append to file");
  }
}

module.exports = { getWeatherDataByCityName };
