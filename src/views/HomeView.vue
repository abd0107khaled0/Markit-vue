<template>
  <NavApp />
  <Home />
</template>

<script>
// @ is an alias to /src
import NavApp from "@/components/Header/NavApp.vue";
import Home from "@/components/Home/Home.vue";
export default {
  name: "HomeView",
  data() {
    return {};
  },
  components: { NavApp, Home },
};
</script>
