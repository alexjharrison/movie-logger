<template>
  <div id="InTheaters">
    <h3>In Theaters</h3>
    <MovieBoxContainer parent="InTheaters" :movies="movieInfo.nowPlaying"/>
  </div>
</template>

<script>
import MovieBoxContainer from "../components/MovieBoxContainer";
import axios from "axios";

export default {
  props: ["movieInfo"],
  components: {
    MovieBoxContainer
  },
  async mounted() {
    if (!this.movieInfo.nowPlaying) {
      let nowPlaying = [];
      let pages = [1];
      let page = 1;
      let first = await axios.get("/api/nowplaying/" + page);
      nowPlaying = first.data.results;
      while (page < first.data.total_pages && page < 6) {
        page++;
        let newData = await axios.get("/api/nowplaying/" + page);
        pages = pages.concat(page);
        nowPlaying = nowPlaying.concat(newData.data.results);
      }
      this.$emit("update", "nowPlaying", nowPlaying);
    }
  }
};
</script>

<style>
</style>
