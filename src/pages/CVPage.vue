<template>
  <div class="mx-auto bg-white p-0">
    <div v-if="isLoaded && cvData">
      <render-c-v :cv="cvData" />
    </div>
    <div v-else class="flex items-center justify-center min-h-[200px] text-text-secondary">
      <p>Loading CV...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import RenderCV from "@/components/RenderCV.vue";
import { useCVData } from "@/composables/UseCVData";

const { cvData, isLoaded } = useCVData();
</script>

