<template>
  <section class="text-center mb-6">
    <h1 class="text-xl sm:text-2xl md:text-3xl text-accent m-0">Professional Experience</h1>
  </section>

  <div class="flex flex-col px-6 mb-8 gap-8">
    <div class="bg-bg-secondary rounded-lg p-6 max-sm:p-3 border-l-4 border-accent-light">
      <p class="text-base text-accent-light flex items-center gap-6 leading-relaxed max-sm:text-sm max-sm:flex-col max-sm:text-center max-sm:gap-2">
        <font-awesome-icon :icon="['fas', 'circle-exclamation']" class="text-accent-light text-2xl shrink-0" />
        Looking for my next role!
      </p>
    </div>

    <experience-card v-for="(ex, index) in cvData.work" :key="index" :experience="ex" />
  </div>
</template>

<script setup lang="ts">
import { cvData } from "@/data/cvData";
import ExperienceCard from "@/components/ExperienceCard.vue";
</script>
