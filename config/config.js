const mongoose = require("mongoose");
require("dotenv").config();

const connectUri = process.env.MONGODB_URI;
mongoose.connect(
  connectUri,
  { useNewUrlParser: true },
  err => {
    if (err) console.log(err);
  }
);

module.exports = mongoose;
