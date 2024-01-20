const https = require("https");

function httpsRequest(options) {
  console.log("made request");
  // make the api request
  return new Promise((resolve, reject) => {
    https
      .get(options, (res) => {
        let data = "";

        // a chunk of data has been received
        res.on("data", (chunk) => {
          data += chunk;
        });

        // the whole response has been received
        res.on("end", () => {
          resolve(data);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = httpsRequest;
