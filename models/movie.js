const mongoose = require("../config/config");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const movieSchema = new Schema({
  title: String,
  id: Number,
  release_date: String,
  date_saved: {
    type: Date,
    default: Date.now
  },
  backdrop_path: String,
  watched: {
    type: Boolean,
    default: false
  },
  overview: String
});
movieSchema.statics.deleteAll = function (cb) {
  return this.deleteMany({});
};
movieSchema.statics.findAllNotWatched = function (cb) {
  return this.find({ watched: false });
};
movieSchema.statics.findAllWatched = function (cb) {
  return this.find({ watched: true });
};
movieSchema.statics.searchByTitle = function (title, cb) {
  return this.find({ title: title });
};
movieSchema.statics.setWatchedById = function (id, cb) {
  return this.update({ id: id }, { $set: { watched: true } });
};


const Movie = new mongoose.model("Movie", movieSchema);

module.exports = Movie;
