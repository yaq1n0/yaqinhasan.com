<template>
  <div class="app-container">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/navbar/NavBar.vue";
</script>

<style lang="scss">
@forward "@/styles/main";

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
