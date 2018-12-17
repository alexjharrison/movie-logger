<template>
  <div @toggle="toggleOne" class="movieboxcontainer">
    <MovieBox v-for="movie in movies" :key="movie.id" :movie="movie"/>
  </div>
</template>

<script>
import MovieBox from "./MovieBox";

export default {
  props: ["movies", "parent"],
  components: {
    MovieBox
  },
  data() {
    return {
      expandedId: -1
    };
  },
  methods: {
    toggleOne(id) {
      this.expandedId = id;
    }
  },
  computed: {
    movieDisplayedList() {
      return this.expandedId === -1
        ? this.movies
        : this.movies.filter(movie => movie.id === this.expandedId);
    }
  }
};
</script>

<style>
</style>
