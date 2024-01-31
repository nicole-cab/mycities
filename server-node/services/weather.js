const axiosApiReq = require("../utils/axios");

const getWeather = async (cityName, countryCode, API_KEY) => {
  // custom config
  const config = {
    method: "get",
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "," +
      countryCode +
      "&appid=" +
      API_KEY +
      "&units=metric",
  };

  // make API request
  const response = await axiosApiReq(config);
  if (response.success) {
    // handle successful response (received data from api)
    console.log("services true");

    // extract data and write to cityInfo.json
    const extractedData = {
      weather: {
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
      },
      main: {
        temp: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        temp_min: response.data.main.temp_min,
        temp_max: response.data.main.temp_max,
      },
      country: response.data.sys.country,
    };

    return { success: true, extractedData: extractedData };
  } else {
    console.log("services false");
    return { success: false, error: response.error };
  }
};

module.exports = { getWeather };
