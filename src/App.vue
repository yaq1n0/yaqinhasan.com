<template>
  <div>
    <nav-bar />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<style lang="scss">
@forward "@/styles/main";
</style>
