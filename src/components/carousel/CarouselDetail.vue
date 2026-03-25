<template>
  <div class="bg-bg-tertiary rounded-xl overflow-hidden">
    <div class="flex flex-wrap items-center justify-between gap-3 bg-bg-secondary p-6 max-sm:flex-col max-sm:p-3">
      <h2 class="text-2xl text-accent m-0 leading-snug flex-1">{{ title }}</h2>
      <div class="flex flex-wrap gap-2">
        <slot name="actions" />
      </div>
    </div>

    <p v-if="summary" class="text-lg text-center text-accent-light py-3 px-6 border-b border-border-light">
      {{ summary }}
    </p>

    <div class="p-6 max-sm:p-3 prose prose-headings:text-accent-light max-w-none">
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
