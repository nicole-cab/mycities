const bcrypt = require("bcrypt");

function bcryptHash(password, saltRounds) {
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      console.log("Salt: ", salt);
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      console.log("Hash: ", hash);
    })
    .catch((err) => console.error(err.message));
}

function bcryptCompare(password, hash) {
  bcrypt
    .compare(password, hash)
    .then((res) => {
      console.log(res); // return true
    })
    .catch((err) => console.error(err.message));
}

const saltRounds = 10;
const password = "Admin@123";

// bcryptHash(password, saltRounds);

bcryptCompare(
  "Admin@123",
  "$2b$10$z2GxX6//symHE.1E.h5Pdu9Gw/DEL0y/VjgeGhCKhWoFwc2zER9/C"
);
