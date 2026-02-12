<template>
  <div :class="{ 'print-mode-app': isPrintMode }">
    <nav-bar v-if="!isPrintMode" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import { useTheme } from "@/composables/theme/UseTheme";
import { usePrintMode } from "./composables/UsePrintMode";

// Initialize theme system on app startup
useTheme();

const { isPrintMode } = usePrintMode();
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
