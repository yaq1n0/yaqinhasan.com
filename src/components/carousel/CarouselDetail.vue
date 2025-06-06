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

    <dev-content v-if="showDevContent" title="Developer Content" :show="true">
      <slot name="dev-content" />
    </dev-content>
  </div>
</template>

<script setup lang="ts">
import DevContent from "@/components/DevContent.vue";

defineProps<{
  title: string;
  summary?: string;
  showDevContent?: boolean;
}>();
</script>

<style lang="scss" scoped>
.carousel-detail {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  padding: map.get($spacing, "xl");
  margin-bottom: map.get($spacing, "xl");
  animation: fadeIn 0.5s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  .detail-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: map.get($spacing, "lg");
    margin-bottom: map.get($spacing, "lg");
    padding-bottom: map.get($spacing, "md");
    border-bottom: 1px solid var(--color-border);
    background-color: var(--color-bg-secondary);
    margin: -#{map.get($spacing, "xl")} -#{map.get($spacing, "xl")} map.get($spacing, "lg") -#{map.get($spacing, "xl")};
    padding: map.get($spacing, "xl");
    border-radius: map.get($border-radius, "lg") map.get($border-radius, "lg") 0 0;
    min-height: 80px;
    display: flex;
    align-items: center;

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
      align-self: center;
    }
  }

  .summary {
    font-size: map.get($font-sizes, "lg");
    text-align: center;
    margin-bottom: map.get($spacing, "lg");
    color: var(--color-accent-light);
    padding: map.get($spacing, "md") 0;
    border-bottom: 1px solid var(--color-border-light);
  }

  .detail-content {
    padding: map.get($spacing, "md") 0;
    flex: 1;
    overflow-y: auto;
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: map.get($breakpoints, "md")) {
  .carousel-detail {
    padding: map.get($spacing, "lg");

    .detail-header {
      margin: -#{map.get($spacing, "lg")} -#{map.get($spacing, "lg")} map.get($spacing, "lg") -#{map.get($spacing, "lg")};
      padding: map.get($spacing, "lg");
      flex-direction: column;
      align-items: center;
      text-align: center;

      h2 {
        margin-bottom: map.get($spacing, "md");
      }
    }
  }
}
</style>
