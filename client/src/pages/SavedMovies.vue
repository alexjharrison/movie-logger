<template>
  <div id="SavedMovies">
    <h3>Saved Movies</h3>
    <MovieBox v-for="movie in savedMovies" :movie="movie" :key="movie.id"/>
  </div>
</template>

<script>
import axios from "axios";
import MovieBox from "../components/MovieBox";

export default {
  props: ["movieInfo"],
  components: {
    MovieBox
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
