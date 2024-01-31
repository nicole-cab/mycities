// ---------- get the services
// currency service
// const { getCurrency } = require("../services/currency");

// weather service
const { getWeather } = require("../services/weather");

// time service

const getCityData = async (req, res) => {
  // get the cityName and countryCode
  const { cityName, countryCode } = req.query;
  console.log(cityName, countryCode);

  // this will hold the combined extracted data from the different APIs
  let cityData = {};

  // check if the cityName and countryCode are given
  if (cityName && countryCode) {
    console.log("cityName and countryCode given!");

    // get the extracted weather data
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

    // if the all the data extracted and combined successfully
    return res.status(200).json({ status_code: 200, data: cityData });
  }

  // if cityName and countryCode not given
  return res
    .status(404)
    .json({ success: false, msg: "country code not provided" });
};

function handleErrors(res, error, msg) {
  return res.status(error.response.status).json({
    status_code: error.response.status,
    error_message: msg + error.response.data.message,
  });
}

module.exports = {
  getCityData,
};
