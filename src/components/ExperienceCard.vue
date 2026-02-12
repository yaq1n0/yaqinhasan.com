<template>
  <div class="experience-card">
    <div class="card-header">
      <div class="title-section">
        <h2>{{ experience.position }}</h2>
        <h3>{{ experience.name }}</h3>
      </div>
      <span>{{ experience.startDate }} - {{ experience.endDate }}</span>
    </div>

    <div class="card-content">
      <ul class="highlights">
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

<style lang="scss" scoped>
.experience-card {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
  padding: map.get($spacing, "xl");
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: map.get($spacing, "md");

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    flex-direction: column;
    align-items: flex-start;
    padding: map.get($spacing, "md");
  }
}

.card-content {
  padding: map.get($spacing, "xl");

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }
}

.highlights {
  line-height: 1.7;
}
</style>
