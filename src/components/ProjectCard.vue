<template>
  <div class="project-card bg-bg-tertiary rounded-xl overflow-hidden" :class="{ simplified }">
    <div class="project-header bg-bg-secondary px-6 py-3 max-md:px-4 max-md:py-2">
      <div class="flex items-center justify-between gap-2">
        <h3
          class="text-xl font-semibold text-accent m-0 flex-1 min-w-0 max-md:text-lg max-sm:text-base"
          :class="{ 'text-base': simplified }"
        >
          {{ project.name }}
        </h3>
        <div class="flex items-center gap-2 shrink-0">
          <span
            v-if="project.status"
            class="text-sm py-0.5 px-2.5 rounded font-medium whitespace-nowrap bg-bg-primary text-text-secondary border border-border-light"
            :class="[statusClass, simplified ? 'text-xs py-0.5 px-2' : '']"
          >
            {{ statusLabel }}
          </span>
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
      <p v-if="!simplified && project.description" class="mt-1 mb-0 text-sm text-text-secondary leading-snug line-clamp-2">{{ project.description }}</p>
    </div>

    <!-- Default: htmlDescription + keywords -->
    <div v-if="!simplified" class="p-6 max-sm:p-3">
      <div v-if="project.htmlDescription" class="mb-3">
        <div
          ref="descriptionRef"
          class="leading-relaxed"
          :class="{ 'line-clamp-8 max-md:line-clamp-4': !expanded }"
          v-html="project.htmlDescription"
        />
        <button
          v-if="isOverflowing || expanded"
          class="mt-2 p-0 text-sm text-accent opacity-80 transition-opacity duration-150 hover:opacity-100 cursor-pointer"
          @click="toggle"
        >
          {{ expanded ? "less..." : "more..." }}
        </button>
      </div>

      <div v-if="project.keywords?.length" class="flex flex-wrap gap-1 mt-3">
        <span
          v-for="keyword in project.keywords"
          :key="keyword"
          class="text-sm py-0.5 px-2 rounded bg-accent-translucent text-accent-light whitespace-nowrap"
          >{{ keyword }}</span
        >
      </div>
    </div>

    <!-- Simplified: description (plain text) + keywords -->
    <div v-if="simplified" class="py-3 px-6 pb-4">
      <p v-if="project.description" class="text-[0.8125rem] text-text-secondary leading-snug m-0 mb-2.5">{{ project.description }}</p>
      <div v-if="project.keywords?.length" class="flex flex-wrap gap-1 mt-3">
        <span
          v-for="keyword in project.keywords.slice(0, 5)"
          :key="keyword"
          class="text-xs py-0.5 px-1.5 rounded bg-accent-translucent text-accent-light whitespace-nowrap"
          >{{ keyword }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue";
import GButton from "@/components/GButton.vue";
import type { FullProject } from "@/data/models/Project";

const props = withDefaults(
  defineProps<{
    project: FullProject;
    simplified?: boolean;
  }>(),
  { simplified: false }
);

const statusLabel = computed(() => {
  if (!props.project.status) return "";
  if (props.project.status === "In Progress") return "Active";
  return props.project.status;
});

const statusClass = computed(() => {
  if (!props.project.status) return "";
  const s = props.project.status.toLowerCase();
  if (s === "complete") return "text-[#4ade80] border-[rgba(74,222,128,0.3)]";
  if (s === "in progress") return "text-[#facc15] border-[rgba(250,204,21,0.3)]";
  if (s === "archived") return "";
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
.project-card:not(.simplified) + .project-card:not(.simplified) {
  margin-top: 1.5rem;
}
</style>
