const fs = require("fs");

const readFromFile = (path, key) => {
  try {
    // read the json
    let json = fs.readFileSync(path);
    json = JSON.parse(json);
    console.log("> Data successfully READ from file");
    // return value of key
    return { success: true, data: json[key] };
  } catch (error) {
    console.log("An error has occurred ", error);
    return { success: false };
  }
};

module.exports = {
  readFromFile,
};
