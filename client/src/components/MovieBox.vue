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
    <button @click="toggle">{{expanded ? "Collapse": "More Info"}}</button>
    <button v-if="!expanded" @click="save">Save Movie</button>
    <a
      :href="'https://google.com/search?q='+movie.title+' ('+movie.release_date.slice(0,4)+')'"
    >Showtimes</a>
    <br>
    <br>
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
      this.expanded = !this.expanded;
      this.$emit("toggle", this.expanded ? this.movie.id : -1);
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
  width: 200px;
  text-align: center;
  margin: 10px auto;
  border-top: #999 solid 1px;
  padding: 5px;
}
.moviebox img {
  width: 100%;
  display: block;
}
.expand {
  background-color: #ddd;
  width: 100%;
  height: 100%;
}
@media only screen and (max-width: 435px) {
  .moviebox {
    width: 100%;
  }
}
</style>
