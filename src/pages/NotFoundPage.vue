<template>
  <div class="flex justify-center items-center min-h-[70vh] text-center p-8">
    <div class="max-w-[600px]">
      <h1 class="text-[8rem] md:text-[6rem] sm:text-[4rem] font-bold text-accent m-0 leading-none">404</h1>
      <h2 class="text-3xl md:text-2xl mb-6 text-text-primary">Page Not Found</h2>
      <p class="text-lg mb-8 text-text-secondary">The page you're looking for doesn't exist or has been moved.</p>
      <g-button label="Return to Home" to="/" icon="home" icon-prefix="fas" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GButton from "@/components/GButton.vue";
</script>
