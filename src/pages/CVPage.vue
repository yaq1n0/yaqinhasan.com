<template>
  <div class="cv-page">
    <div v-if="isLoaded && cvData" class="cv-wrapper">
      <render-c-v :cv="cvData" />
    </div>
    <div v-else class="cv-loading">
      <p>Loading CV...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import RenderCV from "@/components/RenderCV.vue";
import { useCVData } from "@/composables/UseCVData";

const { cvData, isLoaded } = useCVData();
</script>

<style lang="scss" scoped>
.cv-page {
  margin: 0 auto;
  padding: 0;
  background: white;
}

.cv-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--color-text-secondary);
}
</style>
