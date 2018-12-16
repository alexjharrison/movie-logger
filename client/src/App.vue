<template>
  <div id="app">
    <Header @newPage="newPage" :pages="pages" :movieInfo="movieInfo" @update="updateInfo"/>
    <InTheaters v-if="currentPage==='In Theaters'" :movieInfo="movieInfo" @update="updateInfo"/>
    <NewOnDvd v-if="currentPage==='New On DVD'" :movieInfo="movieInfo" @update="updateInfo"/>
    <SavedMovies v-if="currentPage==='Saved Movies'" :movieInfo="movieInfo" @update="updateInfo"/>
    <ComingSoon v-if="currentPage==='Coming Soon'" :movieInfo="movieInfo" @update="updateInfo"/>
    <Watched v-if="currentPage==='Watched'" :movieInfo="movieInfo" @update="updateInfo"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import {
  InTheaters,
  NewOnDvd,
  SavedMovies,
  ComingSoon,
  Watched
} from "./pages";

export default {
  components: {
    Header,
    InTheaters,
    NewOnDvd,
    SavedMovies,
    ComingSoon,
    Watched
  },
  data() {
    return {
      currentPage: "Saved Movies",
      pages: [
        "In Theaters",
        "New On DVD",
        "Saved Movies",
        "Coming Soon",
        "Watched"
      ],
      movieInfo: {
        // comingSoon: []
      }
    };
  },
  methods: {
    newPage(pageName) {
      this.currentPage = pageName;
    },
    updateInfo(infoToSaveName, infoToSaveData) {
      this.$set(this.movieInfo, infoToSaveName, infoToSaveData);
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
</style>
