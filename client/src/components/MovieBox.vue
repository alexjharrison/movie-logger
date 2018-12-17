<template>
  <div :class="'moviebox ' + movie.id">
    <h2>{{ movie.title }}</h2>
    <h3>Release: {{ movie.release_date }}</h3>
    <img
      v-if="movie.backdrop_path"
      :src="'https://image.tmdb.org/t/p/w500/'+movie.backdrop_path"
      :alt="movie.title + ' poster'"
    >
    <img v-else src="../assets/images/noMovie.jpg" :alt="movie.title + ' poster'">
    <p>{{movie.overview}}</p>
    <button @click="toggle">More Info</button>
    <button @click="save">Save Movie</button>
    <br>
    <br>
    <hr>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      omdb: {},
      expanded: false
    };
  },
  props: ["movie"],
  computed: {
    posterUrl() {
      return this.movie.backdrop_path
        ? "https://image.tmdb.org/t/p/w500/" + this.movie.backdrop_path
        : "../assets/images/noMovie.jpg";
    }
  },
  methods: {
    toggle() {
      this.$emit("toggle", this.movie.id);
      document
        .getElementsByClassName(this.movie.id)[0]
        .classList.toggle("expand");
    },
    save() {
      axios
        .post("/api/saveMovie", {
          title: this.movie.title,
          id: this.movie.id,
          release_date: this.movie.release_date,
          backdrop_path: this.movie.backdrop_path,
          overview: this.movie.overview
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style>
.moviebox {
  width: 80%;
  text-align: center;
  margin: 0 auto;
  transition: 2s all ease-in-out;
}
.moviebox img {
  width: 100%;
  display: block;
}
.expand {
  background-color: #ddd;
  width: 100vw;
  height: 100vh;
}
</style>
