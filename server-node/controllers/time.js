const { getTimeDataByCityName } = require("../services/time");

const getTimeData = (req, res) => {
  // get the cityName
  const { cityName, countryCode } = req.query;
  console.log("city: ", cityName, countryCode);

  // if cityName does exists get weather data
  if (cityName) {
    const resData = getTimeDataByCityName(cityName, countryCode, req.API_KEY);
    resData
      .then((resData) => res.status(200).json(JSON.parse(resData)))
      .catch((error) => {
        console.log("heeloo");
        console.log(error);
        res.status(404).json({ succes: false, msg: error });
      });
  } else {
    return res
      .status(404)
      .json({ success: false, msg: "city name not provided" });
  }
};

module.exports = {
  getTimeData,
};
