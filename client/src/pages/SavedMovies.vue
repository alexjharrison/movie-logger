<template>
  <div id="SavedMovies">
    <h3>Saved Movies</h3>
    <MovieBoxContainer parent="Saved Movies" :movies="savedMovies"/>
  </div>
</template>

<script>
import axios from "axios";
import MovieBoxContainer from "../components/MovieBoxContainer";

export default {
  props: ["movieInfo"],
  components: {
    MovieBoxContainer
  },
  data() {
    return {
      savedMovies: []
    };
  },
  mounted() {
    axios
      .get("/api/allSavedUnwatched")
      .then(res => {
        console.log(res.data);
        this.savedMovies = res.data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>
