const mysql = require("mysql2");

const connectDB = () => {
  const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "root",
    database: "TEMP_STUDENT",
    port:3306
  });
  db.connect((err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log("Database connected");
  });
  return db
};

module.exports = connectDB;
