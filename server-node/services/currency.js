const axiosApiReq = require("../utils/axios");

const getCurrency = async (countryCode) => {
  // custom config
  const config = {
    method: "get",
    url: "https://restcountries.com/v3.1/alpha/" + countryCode,
  };

  // make API request
  const response = await axiosApiReq(config);
  if (response.success) {
    // handle successful response (received data from api)
    console.log("services true");

    // extract data
    const extractedData = {
      name: response.data[0].name.common,
      currencies: response.data[0].currencies,
    };

    return { success: true, extractedData: extractedData };
  } else {
    console.log("services false");
    return { success: false, error: response.error };
  }
};

module.exports = { getCurrency };
