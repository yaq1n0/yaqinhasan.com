<template>
  <section class="text-center mb-6">
    <h1 class="text-3xl md:text-2xl sm:text-xl text-accent m-0">Professional Experience</h1>
  </section>

  <div class="flex flex-col px-6 mb-8 gap-8">
    <div class="bg-bg-secondary rounded-lg p-6 sm:p-3 border-l-4 border-accent-light">
      <p class="text-base text-accent-light flex items-center gap-6 leading-relaxed sm:text-sm sm:flex-col sm:text-center sm:gap-2">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-accent-light text-2xl shrink-0" />
        Looking for my next role!
      </p>
    </div>

    <experience-card v-for="(ex, index) in experience" :key="index" :experience="ex" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import cvData from "@/data/cv.json";
import ExperienceCard from "@/components/ExperienceCard.vue";

// Get the first (and only) work entry
const experience = computed(() => cvData.work);
</script>
