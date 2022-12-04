const express = require("express");
const connectDB = require("./config/db");
const readXlsxFile = require("read-excel-file/node");
const validate = require("./validations/sampleValidation");

const app = express();

// connect to DB
const connection = connectDB();

const applyValidation = (rows) => {
  let flag = true;

  for (let index = 0; index < rows.length; index++) {
    flag = flag && validate(rows[index]);
    if (!flag) break;
  }

  return flag;
};

const readData = () => {
  readXlsxFile("D:\\del\\nodesqlfilescan\\files\\sample.xlsx").then((rows) => {
    // `rows` is an array of rows

    rows.shift();
    console.log(rows);

    const query = "INSERT INTO Student VALUES ?";

    if (applyValidation(rows)) {
      connection.query(query, [rows], (err, res) => {
        if (err) return console.log(err);
        console.log(res);
      });
    } else {
      console.log("File discarded");
    }
  });
};

app.get("/parseFile", async (req, res) => {
  readData();
  return res.json({ data: "Data inserted" });
});

// listen server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server started  at ${PORT}`);
});
