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
    process.env.TMDB_API_KEY_V3 + "&page=" + page
  );
  res.json(apiReq.data);
});

router.get("/nowplaying/:page", async (req, res) => {
  console.log(req.params.page);
  let page = req.params.page ? req.params.page : 1;
  let apiReq = await axios.get(
    tmdbUrl +
    "movie/now_playing?language=en-US&region=us&page=1&api_key=" +
    process.env.TMDB_API_KEY_V3 + "&page=" + page
  );
  res.json(apiReq.data);
});

router.post("/saveMovie", async (req, res) => {
  let newMovie = new MovieModel(req.body);
  let confirmation = await newMovie.save();
  res.send(confirmation)
})

router.get("/allSavedUnwatched", async (req, res) => {
  let allUnwatched = await MovieModel.findAllNotWatched();
  res.send(allUnwatched);
})

router.get("/allSavedWatched", async (req, res) => {
})

router.get("/omdb/:title/:year", async (req, res) => {
  const { title, year } = req.params
  const queryUrl = omdbUrl + "?apikey=" + process.env.OBMD_KEY + "&t=" + title + "&y=" + year;
  console.log(queryUrl)
  try {
    let apiReq = await axios.get(queryUrl);
    res.json(apiReq.data);
  } catch (e) {
    console.log(e.response.status)
    res.json(e.response.status);
  }
});

router.get("/deleteAll", async (req, res) => {
  let resp = await MovieModel.deleteAll();
  res.send(resp);
});

module.exports = router;
