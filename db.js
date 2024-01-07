function connectDB() {
  const mysql = require("mysql");

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123!",
  });

  // connect to the db
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    // create a db if it doesn't already exist
    let sql = "CREATE DATABASE IF NOT EXISTS mycities";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    // create a table if it doesn't already exist
    sql =
      "CREATE TABLE IF NOT EXSTS users (id int NOT NULL AUTO_INCREMENT, username VARCHAR(16), )";
    con.query();
  });

  return con;
}

function endDB() {
  con.end((err) => {
    if (err) return console.error(err.message);

    console.log("Close the database connection.");
  });
}
module.exports = { connectDB, endDB };
