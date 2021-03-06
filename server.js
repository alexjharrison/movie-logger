const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", require("./routes/api"));
app.use(express.static("./client/dist"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, err => {
  if (err) console.log(err);
  console.log("Server started on port " + PORT);
});
