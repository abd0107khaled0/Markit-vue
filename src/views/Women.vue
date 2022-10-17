<template>
  <div>
    <NavApp />
    <Women />
  </div>
</template>

<script>
import Women from "@/components/Women/Women.vue";
import NavApp from "@/components/Header/NavApp.vue";
export default {
  name: "WomenV",
  components: { Women, NavApp },
};
</script>

<style lang="scss" scoped></style>
