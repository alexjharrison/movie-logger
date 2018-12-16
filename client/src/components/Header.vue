<template>
  <div id="header">
    <h1 class="logo">Movie-Logger</h1>
    <nav>
      <h3 @click="newPage" v-for="page in pages" :key="page">{{page}}</h3>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["pages"],
  methods: {
    newPage(e) {
      this.$emit("newPage", e.target.innerText);
    }
  }
};
</script>

<style>
#header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #eee;
  padding: 0 20px;
}
.logo {
  font-size: 20px;
}
nav h3 {
  display: inline;
  padding: 10px;
  cursor: pointer;
}
nav h3:hover {
  color: #333;
}
</style>
