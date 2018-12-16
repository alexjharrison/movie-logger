<template>
  <div id="ComingSoon">
    <h1>Coming Soon</h1>
    <MovieBox v-for="movie in movieInfo.comingSoon" :movie="movie" :key="movie.id"/>
  </div>
</template>

<script>
import MovieBox from "../components/MovieBox";
import axios from "axios";

export default {
  props: ["movieInfo"],
  components: {
    MovieBox
  },
  async mounted() {
    if (!this.movieInfo.comingSoon) {
      let comingSoon = [];
      let pages = [1];
      let page = 1;
      let first = await axios.get("/api/newmovies/" + page);
      comingSoon = first.data.results;
      while (page < first.data.total_pages && page < 6) {
        page++;
        let newData = await axios.get("/api/newmovies/" + page);
        pages = pages.concat(page);
        comingSoon = comingSoon.concat(newData.data.results);
      }
      this.$emit("update", "comingSoon", comingSoon);
    }
  }
};
</script>

<style>
</style>
