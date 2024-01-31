const axios = require("axios");

async function axiosApiReq(config) {
  try {
    // make API request
    const response = await axios(config);

    console.log("axios.js works");

    // handle successful response
    return { success: true, data: response.data }; // send response body
  } catch (error) {
    if (error.code === "ECONNRESET" || error.code === "ETIMEOUT") {
      // handle network issues
      console.error("Network Error: ", error.message);
    } else {
      // handle other errors (API errors)
      handleStatusCodes(error);
    }
    return { success: false, error: error };
  }
}

function handleStatusCodes(error) {
  console.log("handle error: ", error);

  if (error.response.status === 404) {
    console.error("404 NOT FOUND");
  } else if (error.response.status === 401) {
    console.error("401 UNAUTHORIZED");
  } else if (error.response.status === 403) {
    console.error("403 FORBIDDEN");
  } else if (error.response.status === 429) {
    console.error("429 TOO MANY REQUESTS");
  } else if (error.response.status === 500) {
    console.error("500 INTERNAL SERVER ERROR");
  } else {
    console.error("OTHER WEATHER API ERROR");
  }

  console.error("API ERROR: ", error.message);
}

module.exports = axiosApiReq;
