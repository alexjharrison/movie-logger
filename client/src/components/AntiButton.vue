<template>
  <div id="AntiButton">
    <button @click="decrementHandler2">Don't click me</button>
  </div>
</template>

<script>
export default {
  props: ["amount"],
  methods: {
    decrementHandler2() {
      this.$emit("decrement", this.amount);
    }
  }
};
</script>

<style>
#AntiButton button {
  width: 500px;
}
</style>
