const { getWeatherDataByCityName } = require("../services/weather");

const getWeatherData = (req, res) => {
  // get the cityName
  const { cityName } = req.params;

  // if cityName does exists get weather data
  if (cityName) {
    const resData = getWeatherDataByCityName(cityName, "", req.API_KEY);
    resData
      .then((resData) => res.status(200).json(JSON.parse(resData)))
      .catch((error) => res.status(404).json({ succes: false, msg: error }));
  } else {
    return res
      .status(404)
      .json({ success: false, msg: "city name not provided" });
  }
};

module.exports = {
  getWeatherData,
};
