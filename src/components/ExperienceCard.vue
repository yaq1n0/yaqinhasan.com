<template>
  <div class="bg-bg-tertiary rounded-xl overflow-hidden">
    <div class="card-header bg-gradient-to-br from-accent to-accent-light p-8 flex justify-between items-start flex-wrap gap-3 md:p-6 sm:flex-col sm:items-start sm:p-3">
      <div>
        <h2>{{ experience.position }}</h2>
        <h3>{{ experience.name }}</h3>
      </div>
      <span>{{ experience.startDate }} - {{ experience.endDate }}</span>
    </div>

    <div class="p-8 md:p-6 sm:p-3">
      <ul class="highlights leading-relaxed">
        <li v-for="(bullet, index) in experience.highlights" :key="index">
          <span>{{ bullet }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  experience: {
    position: string;
    name: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  };
}>();
</script>
