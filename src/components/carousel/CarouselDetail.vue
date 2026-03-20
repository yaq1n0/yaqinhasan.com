<template>
  <div class="bg-bg-tertiary rounded-xl overflow-hidden">
    <div class="detail-header flex flex-wrap items-center justify-between gap-3 bg-bg-secondary p-6 sm:flex-col sm:p-3">
      <h2 class="text-2xl text-accent m-0 leading-snug flex-1">{{ title }}</h2>
      <div class="flex flex-wrap gap-2">
        <slot name="actions" />
      </div>
    </div>

    <p v-if="summary" class="text-lg text-center text-accent-light py-3 px-6 border-b border-border-light">
      {{ summary }}
    </p>

    <div class="detail-content p-6 sm:p-3">
      <slot />
    </div>

    <dev-content v-if="$slots['dev-content']" title="Developer Content">
      <slot name="dev-content" />
    </dev-content>
  </div>
</template>

<script setup lang="ts">
import DevContent from "@/components/DevContent.vue";

defineProps<{
  title: string;
  summary?: string;
}>();
</script>

<style scoped>
.detail-content h3 {
  font-size: 1.25rem;
  color: var(--color-accent-light);
  margin: 1.5rem 0 0.75rem;
}

.detail-content h4 {
  font-size: 1.125rem;
  color: var(--color-accent-light);
  margin: 1.5rem 0 0.5rem;
}

.detail-content p {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.detail-content ul {
  margin-bottom: 0.75rem;
  padding-left: 2rem;
}

.detail-content ul li {
  margin-bottom: 0.25rem;
}
</style>
