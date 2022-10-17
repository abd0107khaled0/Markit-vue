<template>
  <div>
    <NavApp />
    <Men />
  </div>
</template>

<script>
import Men from "@/components/Men/Men.vue";
import NavApp from "@/components/Header/NavApp.vue";
export default {
  name: "MenV",
  components: { Men, NavApp },
};
</script>

<style lang="scss" scoped></style>
