const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", require("./routes/api"));
app.use(express.static("./client/dist"));

const PORT = process.env.port || 5000;

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log("Server started on port " + PORT);
});
