const mongoose = require("../config/config");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const movieSchema = new Schema({
  title: String,
  year: Number,
  dateSaved: Date,
  poster: String
});
movieSchema.statics.deleteAll = function(cb) {
  return this.deleteMany({});
};
movieSchema.statics.findAll = function(cb) {
  return this.find({});
};
movieSchema.statics.searchByTitle = function(title, cb) {
  return this.find({ title: title });
};

const Movie = new mongoose.model("Movie", movieSchema);

module.exports = Movie;
