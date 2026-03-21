<template>
  <div class="bg-bg-tertiary rounded-xl overflow-hidden">
    <div
      class="card-header bg-gradient-to-br from-accent to-accent-light p-8 flex justify-between items-start flex-wrap gap-3 max-md:p-6 max-sm:flex-col max-sm:items-start max-sm:p-3"
    >
      <div>
        <h2 class="text-2xl font-bold">{{ experience.position }}</h2>
        <h3 class="text-lg font-medium">{{ experience.name }}</h3>
      </div>
      <span>{{ experience.startDate }} - {{ experience.endDate }}</span>
    </div>

    <div class="p-8 max-md:p-6 max-sm:p-3">
      <ul class="list-disc pl-4 highlights leading-relaxed">
        <li v-for="(bullet, index) in experience.highlights" :key="index">
          <span>{{ bullet }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CVExperience } from "@/data/models/Experience";

defineProps<{
  experience: CVExperience;
}>();
</script>
