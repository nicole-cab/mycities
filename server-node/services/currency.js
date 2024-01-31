const axiosApiReq = require("../utils/axios");

const getCurrency = async (countryCode, API_KEY) => {
  // custom config
  const config = {
    method: "get",
    url: "https://api.api-ninjas.com/v1/country?name=" + countryCode,
    headers: {
      "X-Api-Key": API_KEY,
    },
  };

  // make API request and the currency data
  const response = await axiosApiReq(config);
  if (response.success) {
    // handle successful response (received data from api)
    console.log("services true");

    // extract data and write to cityInfo.json
    console.log(response.data);

    return { success: true, extractedData: extractedData };
  } else {
    console.log("services false");
    return { success: false };
  }
};

module.exports = { getCurrency };
