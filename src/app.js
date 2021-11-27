const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const { PORT } = process.env;

app.get("/", (req, res) => {
  res.send("The main entry application");
});

app.listen(PORT, (req, res) => {
  console.log(`The app is running on PORT ${PORT}`);
});
