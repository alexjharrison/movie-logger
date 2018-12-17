<template>
  <div class="movieboxcontainer">
    <MovieBox
      @toggle="toggleOne"
      v-for="movie in movieDisplayedList"
      :key="movie.id"
      :movie="movie"
    />
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
.movieboxcontainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
}
</style>
