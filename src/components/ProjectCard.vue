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
      <p v-if="project.description" class="project-subtitle">{{ project.description }}</p>
    </div>

    <div class="project-body">
      <div v-if="project.htmlDescription" class="description-container">
        <div ref="descriptionRef" class="project-description" :class="{ truncated: !expanded }" v-html="project.htmlDescription" />
        <button v-if="isOverflowing || expanded" class="toggle-btn" @click="toggle">
          {{ expanded ? "less..." : "more..." }}
        </button>
      </div>

      <div v-if="project.keywords?.length" class="project-keywords">
        <span v-for="keyword in project.keywords" :key="keyword" class="keyword-chip">{{ keyword }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
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

const descriptionRef = ref<HTMLElement | null>(null);
const expanded = ref(false);
const isOverflowing = ref(false);

async function checkOverflow() {
  await nextTick();
  if (!descriptionRef.value || expanded.value) return;
  isOverflowing.value = descriptionRef.value.scrollHeight > descriptionRef.value.clientHeight + 1;
}

function toggle() {
  expanded.value = !expanded.value;
}

onMounted(() => {
  checkOverflow();
  window.addEventListener("resize", checkOverflow);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkOverflow);
});
</script>

<style scoped>
.project-card {
  background-color: var(--color-bg-tertiary);
  border-radius: 0.75rem;
  overflow: hidden;
}

.project-card + .project-card {
  margin-top: 1.5rem;
}

.project-header {
  background-color: var(--color-bg-secondary);
  padding: 0.75rem 1.5rem;
}

@media (max-width: 768px) {
  .project-header {
    padding: 0.5rem 1rem;
  }
}

.project-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.project-title-row h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-accent);
  margin: 0;
  flex: 1;
  min-width: 0;
}

@media (max-width: 768px) {
  .project-title-row h3 {
    font-size: 1.125rem;
  }
}

@media (max-width: 640px) {
  .project-title-row h3 {
    font-size: 1rem;
  }
}

.project-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.project-actions :deep(.btn) {
  min-width: 0 !important;
  min-height: 0 !important;
  padding: 0.25rem !important;
}

.status-badge {
  font-size: 0.875rem;
  padding: 0.2rem 0.6rem;
  border-radius: 0.25rem;
  font-weight: 500;
  white-space: nowrap;
  background-color: var(--color-bg-primary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-light);
}

.status-badge.status-complete {
  color: #4ade80;
  border-color: rgba(74, 222, 128, 0.3);
}

.status-badge.status-in-progress {
  color: #facc15;
  border-color: rgba(250, 204, 21, 0.3);
}

.status-badge.status-archived {
  color: var(--color-text-secondary);
  border-color: var(--color-border-light);
}

.project-subtitle {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.project-body {
  padding: 1.5rem;
}

@media (max-width: 640px) {
  .project-body {
    padding: 0.75rem;
  }
}

.description-container {
  margin-bottom: 0.75rem;
}

.project-description {
  line-height: 1.6;
}

.project-description.truncated {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: hidden;
}

@media (max-width: 768px) {
  .project-description.truncated {
    -webkit-line-clamp: 4;
  }
}

.project-description :deep(h4) {
  font-size: 1.125rem;
  color: var(--color-accent-light);
  margin: 1.5rem 0 0.5rem;
}

.project-description :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.toggle-btn {
  margin-top: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--color-accent);
  opacity: 0.8;
  transition: opacity 0.15s;
}

.toggle-btn:hover {
  opacity: 1;
}

.project-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.75rem;
}

.keyword-chip {
  font-size: 0.875rem;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  background-color: var(--color-accent-translucent);
  color: var(--color-accent-light);
  white-space: nowrap;
}
</style>
