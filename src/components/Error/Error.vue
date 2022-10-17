<template>
  <div class="container">
    <h1>Exist Error</h1>
    <button class="btn btn-danger" @click="goHome()">Go Home</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ErrorV",
  methods: {
    ...mapActions(["redirectTo"]),
    goHome() {
      this.redirectTo({ val: "home" });
    },
  },
};
</script>

<style></style>
