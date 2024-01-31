// ---------- get the services
// currency service
const { getCurrency } = require("../services/currency");

// weather service
const { getWeather } = require("../services/weather");

// time service
const { getTime } = require("../services/time");

const getCityData = async (req, res) => {
  // get the cityName and countryCode
  const { cityName, countryCode } = req.query;
  console.log(cityName, countryCode);

  // this will hold the combined extracted data from the different APIs
  let cityData = {};

  // check if the cityName and countryCode are given
  if (cityName && countryCode) {
    console.log("cityName and countryCode given!");

    // ---------- get the extracted weather data
    const weatherResponse = await getWeather(
      cityName,
      countryCode,
      req.openWeather_API_KEY
    );

    if (weatherResponse.success) {
      // combine the extracted data if successul response
      cityData.weatherData = weatherResponse.extractedData;
    } else {
      return handleErrors(res, weatherResponse.error, "WEATHER API ERROR: ");
    }

    // ---------- get the extracted time data
    const timeResponse = await getTime(
      cityName,
      countryCode,
      req.apiNinjas_API_KEY
    );

    if (timeResponse.success) {
      // combine the extracted data if successul response
      cityData.timeData = timeResponse.extractedData;
    } else {
      return handleErrors(res, timeResponse.error, "TIME API ERROR: ");
    }

    // ---------- get the extracted currency data
    const currencyResponse = await getCurrency(countryCode);

    if (currencyResponse.success) {
      // combine the extracted data if successul response
      cityData.currencyData = currencyResponse.extractedData;
    } else {
      return handleErrors(res, currencyResponse.error, "CURRENCY API ERROR: ");
    }

    // if the all the data extracted and combined successfully
    return res.status(200).json({ status_code: 200, data: cityData });
  }

  // if cityName and countryCode not given
  return res.status(404).json({
    success: false,
    msg: "city name and/or country code not provided",
  });
};

function handleErrors(res, error, msg) {
  let errorMsg;
  if (error.response.data.message) {
    // get error message from openWeather API
    errorMsg = error.response.data.message;
  } else {
    // get error message from API Ninjas
    errorMsg = error.response.data.error;
    console.log(errorMsg);
  }

  return res.status(error.response.status).json({
    status_code: error.response.status,
    error_message: msg + errorMsg,
  });
}

module.exports = {
  getCityData,
};
