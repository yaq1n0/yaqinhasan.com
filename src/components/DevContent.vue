<template>
  <div v-if="isDevMode" class="mt-8 border border-dev-highlight rounded-md overflow-hidden">
    <div class="flex items-center gap-3 bg-bg-secondary px-3 py-3 border-b border-dev-highlight">
      <font-awesome-icon :icon="['fas', 'code']" class="text-dev-highlight mx-2 text-lg" />
      <h4 class="m-0 text-dev-highlight text-lg">{{ title || "Developer Content" }}</h4>
    </div>
    <div class="p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDevMode } from "@/composables/UseDevMode";

const { isDevMode } = useDevMode();

defineProps<{
  title?: string;
}>();
</script>
