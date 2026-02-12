<template>
  <section class="page-header">
    <h1>Professional Experience</h1>
  </section>

  <div class="experience-container">
    <div class="additional-info">
      <p class="info-text">
        <font-awesome-icon :icon="['fas', 'info-circle']" />
        Looking for an exciting and challenging new role where I can expand on my technical and professional skills.
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

<style lang="scss" scoped>
.page-header {
  text-align: center;
  margin-bottom: map.get($spacing, "lg");

  h1 {
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin: 0;

    @media (max-width: map.get($breakpoints, "md")) {
      font-size: map.get($font-sizes, "2xl");
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "xl");
    }
  }
}

.experience-container {
  display: flex;
  flex-direction: column;
  padding: 0 map.get($spacing, "lg");
  margin-bottom: map.get($spacing, "xl");
  gap: map.get($spacing, "xl");
}

.additional-info {
  background-color: var(--color-bg-secondary);
  border-radius: map.get($border-radius, "md");
  padding: map.get($spacing, "lg");
  border-left: 4px solid var(--color-accent-light);

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }

  .info-text {
    font-size: map.get($font-sizes, "base");
    color: var(--color-accent-light);
    display: flex;
    align-items: center;
    gap: map.get($spacing, "lg");
    line-height: 1.6;

    svg {
      color: var(--color-accent-light);
      font-size: map.get($font-sizes, "2xl");
      flex-shrink: 0;
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "sm");
      flex-direction: column;
      text-align: center;
      gap: map.get($spacing, "sm");
    }
  }
}
</style>
