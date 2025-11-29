<template>
  <div v-if="isDevMode" class="dev-content">
    <div class="dev-content-header">
      <font-awesome-icon :icon="['fas', 'code']" class="dev-icon" />
      <h4>{{ title || "Developer Content" }}</h4>
    </div>
    <div class="dev-content-body">
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

<style lang="scss" scoped>
.dev-content {
  margin-top: map.get($spacing, "xl");
  border: 1px solid var(--color-dev-highlight);
  border-radius: map.get($border-radius, "md");
  overflow: hidden;
  transition: all 0.3s ease;

  .dev-content-header {
    display: flex;
    align-items: center;
    gap: map.get($spacing, "md");
    background-color: var(--color-bg-secondary);
    padding: map.get($spacing, "md");
    border-bottom: 1px solid var(--color-dev-highlight);

    .dev-icon {
      color: var(--color-dev-highlight);
      margin: 0 map.get($spacing, "sm");
      font-size: 1.2rem;
    }

    h4 {
      margin: 0;
      color: var(--color-dev-highlight);
      font-size: map.get($font-sizes, "lg");
    }
  }

  .dev-content-body {
    padding: map.get($spacing, "lg");
  }
}
</style>
