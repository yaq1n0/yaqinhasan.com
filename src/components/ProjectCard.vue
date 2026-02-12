<template>
  <div class="project-card">
    <div class="project-header">
      <div class="project-title-row">
        <h3>{{ project.name }}</h3>
        <div class="project-actions">
          <span v-if="project.status" class="status-badge" :class="statusClass">{{ project.status }}</span>
          <g-button
            v-if="project.url"
            :href="project.url"
            icon="github"
            icon-prefix="fab"
            icon-size="lg"
            :hide-label="true"
            label="GitHub"
            border="none"
            background="transparent"
          />
        </div>
      </div>
    </div>

    <div class="project-body">
      <div v-if="project.htmlDescription" class="project-description" v-html="project.htmlDescription" />
      <p v-else-if="project.description" class="project-description">{{ project.description }}</p>

      <div v-if="project.keywords?.length" class="project-keywords">
        <span v-for="keyword in project.keywords" :key="keyword" class="keyword-chip">{{ keyword }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import GButton from "@/components/GButton.vue";
import type { FullProject } from "@/data/models/Project";

const props = defineProps<{
  project: FullProject;
}>();

const statusClass = computed(() => {
  if (!props.project.status) return "";
  const s = props.project.status.toLowerCase();
  if (s === "complete") return "status-complete";
  if (s === "in progress") return "status-in-progress";
  if (s === "archived") return "status-archived";
  return "";
});
</script>

<style lang="scss" scoped>
.project-card {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  overflow: hidden;

  & + & {
    margin-top: map.get($spacing, "lg");
  }
}

.project-header {
  background-color: var(--color-bg-secondary);
  padding: map.get($spacing, "md") map.get($spacing, "lg");

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "sm") map.get($spacing, "base");
  }
}

.project-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: map.get($spacing, "sm");

  h3 {
    font-size: map.get($font-sizes, "xl");
    color: var(--color-accent);
    margin: 0;
    flex: 1;
    min-width: 0;

    @media (max-width: map.get($breakpoints, "md")) {
      font-size: map.get($font-sizes, "lg");
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "base");
    }
  }
}

.project-actions {
  display: flex;
  align-items: center;
  gap: map.get($spacing, "sm");
  flex-shrink: 0;

  :deep(.btn) {
    min-width: 0 !important;
    min-height: 0 !important;
    padding: 0.25rem !important;
  }
}

.status-badge {
  font-size: map.get($font-sizes, "sm");
  padding: 0.2rem 0.6rem;
  border-radius: map.get($border-radius, "sm");
  font-weight: 500;
  white-space: nowrap;
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-light);

  &.status-complete {
    color: #4ade80;
    border-color: rgba(74, 222, 128, 0.3);
  }

  &.status-in-progress {
    color: #facc15;
    border-color: rgba(250, 204, 21, 0.3);
  }

  &.status-archived {
    color: var(--color-text-secondary);
    border-color: var(--color-border-light);
  }
}

.project-body {
  padding: map.get($spacing, "lg");

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }
}

.project-description {
  line-height: 1.6;
  margin-bottom: map.get($spacing, "md");

  :deep(h4) {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-accent-light);
    margin: map.get($spacing, "lg") 0 map.get($spacing, "sm");
  }

  :deep(p) {
    margin-bottom: map.get($spacing, "md");
    line-height: 1.6;
  }
}

.project-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: map.get($spacing, "xs");
  margin-top: map.get($spacing, "md");
}

.keyword-chip {
  font-size: map.get($font-sizes, "sm");
  padding: 0.15rem 0.5rem;
  border-radius: map.get($border-radius, "sm");
  background-color: var(--color-accent-translucent);
  color: var(--color-accent-light);
  white-space: nowrap;
}
</style>
