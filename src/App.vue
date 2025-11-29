<template>
  <div :class="{ 'print-mode-app': isPrintMode }">
    <nav-bar v-if="!isPrintMode" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";

const route = useRoute();
const isPrintMode = computed(() => route.query.print === "true");
</script>

<style lang="scss">
@forward "@/styles/main";

// Print mode - ensure white background everywhere
.print-mode-app {
  background: white !important;
  min-height: 100vh;

  main {
    background: white !important;
  }
}

// Also override body/html for print
@media print {
  html,
  body {
    background: white !important;
  }
}
</style>
