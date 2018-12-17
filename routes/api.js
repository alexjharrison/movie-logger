const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const axios = require("axios");

let MovieModel = mongoose.model("Movie");

const tmdbImg = "https://image.tmdb.org/t/p/w500";
const tmdbUrl = "https://api.themoviedb.org/3/";
const omdbUrl = "http://www.omdbapi.com/";

router.get("/newmovies/:page", async (req, res) => {
  console.log(req.params.page);
  let page = req.params.page ? req.params.page : 1;
  let apiReq = await axios.get(
    tmdbUrl +
      "movie/upcoming?with_release_type=3&region=us&page=1&api_key=" +
      process.env.TMDB_API_KEY_V3 +
      "&page=" +
      page
  );
  //https://api.themoviedb.org/3/movie/upcoming?with_release_type=3&region=us&page=1&api_key=c6fd567acbca3889c784f63b2b977c5b&page=1
  res.json(apiReq.data);
});

router.get("/nowplaying/:page", async (req, res) => {
  console.log(req.params.page);
  let page = req.params.page ? req.params.page : 1;
  let apiReq = await axios.get(
    tmdbUrl +
      "movie/now_playing?language=en-US&region=us&page=1&api_key=" +
      process.env.TMDB_API_KEY_V3 +
      "&page=" +
      page +
      "&append_to_repsonse=videos"
  );
  //https://api.themoviedb.org/3/movie/now_playing?language=en-US&region=us&page=1&api_key=c6fd567acbca3889c784f63b2b977c5b&page=1&append_to_repsonse=videos
  res.json(apiReq.data);
});

router.get("/movieDetails/:id", async (req, res) => {
  const paramUrl =
    tmdbUrl +
    "movie/" +
    req.params.id +
    "?language=en-US&region=us&page=1&api_key=" +
    process.env.TMDB_API_KEY_V3 +
    "&language=en-US&append_to_response=release_dates%2Cvideos,credits";
  let apiReq = await axios.get(paramUrl);
  //https://api.themoviedb.org/3/movie/{{movie_id}}?api_key=c6fd567acbca3889c784f63b2b977c5b&language=en-US&append_to_response=release_dates%2Cvideos
  res.json(apiReq.data);
});

router.post("/saveMovie", async (req, res) => {
  let newMovie = new MovieModel(req.body);
  let confirmation = await newMovie.save();
  res.send(confirmation);
});

router.get("/allSavedUnwatched", async (req, res) => {
  let allUnwatched = await MovieModel.findAllNotWatched();
  res.send(allUnwatched);
});

router.get("/allSavedWatched", async (req, res) => {
  let allWatched = await MovieModel.findAllWatched();
  res.send(allWatched);
});

router.get("/omdb/:title/:year", async (req, res) => {
  const { title, year } = req.params;
  const queryUrl =
    omdbUrl + "?apikey=" + process.env.OBMD_KEY + "&t=" + title + "&y=" + year;
  console.log(queryUrl);
  try {
    let apiReq = await axios.get(queryUrl);
    res.json(apiReq.data);
  } catch (e) {
    console.log(e.response.status);
    res.json(e.response.status);
  }
});

router.delete("/deleteOne", async (req, res) => {
  let resp;
  try {
    resp = await MovieModel.deleteMovie(req.body.id);
  } catch (e) {
    console.log(e);
  }

  res.send(resp);
});

router.delete("/deleteAll", async (req, res) => {
  let resp = await MovieModel.deleteAll();
  res.send(resp);
});

module.exports = router;
