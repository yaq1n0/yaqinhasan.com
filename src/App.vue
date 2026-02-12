<template>
  <div :class="{ 'print-mode-app': onCVPage }">
    <nav-bar v-if="!onCVPage" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { useTheme } from "@/composables/theme/UseTheme";
import { computed } from "vue";
import { useRoute } from "vue-router";

// Initialize theme system on app startup (useTheme -> init())
useTheme();

// Check if we're on the /cv route, and hide the navbar if so, since we're only going there is we want to see just the CV.
const route = useRoute();
const onCVPage = computed(() => route.path === "/cv");
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
