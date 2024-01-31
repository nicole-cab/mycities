const axiosApiReq = require("../utils/axios");

const getTime = async (cityName, countryCode, API_KEY) => {
  // custom config
  const config = {
    method: "get",
    url:
      "https://api.api-ninjas.com/v1/worldtime?city=" +
      cityName +
      "&country=" +
      countryCode,
    headers: {
      "X-Api-Key": API_KEY,
    },
  };

  // make API request
  const response = await axiosApiReq(config);
  if (response.success) {
    // handle successful response (received data from api)
    console.log("services true");

    // get the current time locally given a timezone
    const timezone = response.data.timezone;
    let date_string = new Date().toLocaleString("en-UK", {
      timeZone: timezone,
    });

    // extract data
    const extractedData = {
      datetime: date_string,
      timezone: response.data.timezone,
      day_of_week: response.data.day_of_week,
    };

    return { success: true, extractedData: extractedData };
  } else {
    console.log("services false");
    return { success: false, error: response.error };
  }
};

module.exports = { getTime };
