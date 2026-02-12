<template>
  <div class="carousel-detail">
    <div class="detail-header">
      <h2>{{ title }}</h2>
      <div class="actions">
        <slot name="actions" />
      </div>
    </div>

    <p v-if="summary" class="summary">
      {{ summary }}
    </p>

    <div class="detail-content">
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

<style lang="scss" scoped>
.carousel-detail {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  overflow: hidden;

  .detail-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: map.get($spacing, "md");
    background-color: var(--color-bg-secondary);
    padding: map.get($spacing, "lg");

    @media (max-width: map.get($breakpoints, "sm")) {
      flex-direction: column;
      padding: map.get($spacing, "md");
    }

    h2 {
      font-size: map.get($font-sizes, "2xl");
      color: var(--color-accent);
      margin: 0;
      line-height: 1.3;
      flex: 1;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: map.get($spacing, "sm");
    }
  }

  .summary {
    font-size: map.get($font-sizes, "lg");
    text-align: center;
    color: var(--color-accent-light);
    padding: map.get($spacing, "md") map.get($spacing, "lg");
    border-bottom: 1px solid var(--color-border-light);
  }

  .detail-content {
    padding: map.get($spacing, "lg");

    @media (max-width: map.get($breakpoints, "sm")) {
      padding: map.get($spacing, "md");
    }
  }

  h3 {
    font-size: map.get($font-sizes, "xl");
    color: var(--color-accent-light);
    margin: map.get($spacing, "lg") 0 map.get($spacing, "md");
  }

  h4 {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-accent-light);
    margin: map.get($spacing, "lg") 0 map.get($spacing, "sm");
  }

  p {
    margin-bottom: map.get($spacing, "md");
    line-height: 1.6;
  }

  ul {
    margin-bottom: map.get($spacing, "md");
    padding-left: map.get($spacing, "xl");

    li {
      margin-bottom: map.get($spacing, "xs");
    }
  }
}
</style>
