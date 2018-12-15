<template>
  <div id="app">
    <button @click="clickHandler">I'm a button</button>
    <h1>{{ couter }}</h1>
    <AntiButton
      v-on:decrement="decrementHandler"
      v-for="decrementAmount in decrementAmounts"
      v-bind:amount="decrementAmount"
      v-bind:key="decrementAmount"
    />
    <input type="text" v-model="text" name="thing" id="blah">
  </div>
</template>

<script>
import AntiButton from "./components/AntiButton.vue";

export default {
  components: {
    AntiButton
  },
  mounted() {
    console.log("value: " + this.text);
  },
  data() {
    return {
      couter: 0,
      decrementAmounts: [10, 100, 1000, 10000],
      text: "3"
    };
  },
  methods: {
    clickHandler() {
      this.couter++;
    },
    decrementHandler(amount) {
      this.couter -= amount;
    }
  },
  watch: {
    text() {
      console.log("value: " + this.text);
    }
  }
};
</script>

<style>
button {
}
</style>
