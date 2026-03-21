<template>
  <div class="mx-auto bg-white p-0">
    <render-c-v :cv="cvData" />
  </div>
</template>

<script setup lang="ts">
import RenderCV from "@/components/RenderCV.vue";
import { cvData } from "@/data/cvData";
</script>
