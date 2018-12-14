const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const axios = require("axios");

let MovieModel = mongoose.model("Movie");

const tmdbImg = "https://image.tmdb.org/t/p/w500";
const tmdbUrl = "https://api.themoviedb.org/3/";

router.get("/store/:movie", async (req, res) => {
  const name = req.params.movie;
  let newMovie = new MovieModel({
    title: name,
    year: 2009,
    dateSave: "",
    poster: "poster"
  });

  newMovie.save();
  res.send(newMovie);
});
router.get("/search/:movie", async (req, res) => {
  // if (!req.body.movie) await res.send("no match");
  const name = req.params.movie;
  let searchedItem = await MovieModel.searchByTitle(name); //instance method

  res.status(200).json(searchedItem);
});

router.get("/newmovies", async (req, res) => {
  let apiReq = await axios.get(
    tmdbUrl +
      "movie/upcoming?with_release_type=3&region=us&page=1&api_key=" +
      process.env.TMDB_API_KEY_V3
  );
  res.json(apiReq.data);
});

router.get("/deleteAll", async (req, res) => {
  let resp = await MovieModel.deleteAll();
  res.send(resp);
});

module.exports = router;
