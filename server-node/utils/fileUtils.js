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

const appendToFile = (path, key, value) => {
  // create file if it doesn't already exist and add the city info
  try {
    let json;
    // read the json file if it exists or else create one
    if (fs.existsSync(path)) {
      json = fs.readFileSync(path);
      json = JSON.parse(json);
    } else {
      json = {};
    }

    // append new key-value pair
    json[key] = value;

    // update json with new key-value pair
    fs.writeFileSync(path, JSON.stringify(json), "utf8");
    console.log("> File UPDATED successfully");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

module.exports = {
  readFromFile,
  appendToFile,
};
