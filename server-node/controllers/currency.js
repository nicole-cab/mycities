const { getCurrencyDataByCountry } = require("../services/currency");

const getCurrencyData = async (req, res) => {
  //   // get the cityName
  //   const { cityName, countryCode } = req.query;
  //   console.log("city: ", cityName, countryCode);

  // get countryCode
  const countryCode = "ES";

  // if countryCode exists get currency data
  if (countryCode) {
    const response = await getCurrencyDataByCountry(countryCode, req.API_KEY);
    if (response.success) {
      console.log("controllers true");
      return res.status(200).json({ success: true });
    }
  } else {
    return res
      .status(404)
      .json({ success: false, msg: "country code not provided" });
  }
};

module.exports = {
  getCurrencyData,
};
