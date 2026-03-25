<template>
  <div class="bg-bg-tertiary rounded-xl overflow-hidden">
    <!-- Header: title, company, dates, tech pills -->
    <div class="bg-gradient-to-br from-accent to-accent-light p-6 max-sm:p-4">
      <div class="flex justify-between items-start gap-3 max-sm:flex-col">
        <div>
          <h2 class="text-2xl font-bold m-0 text-bg-primary max-md:text-xl max-sm:text-lg">{{ experience.title }}</h2>
          <h3 class="text-base font-medium mt-1 mb-0 text-bg-secondary max-sm:text-sm">{{ experience.company }}</h3>
        </div>
        <span class="text-sm whitespace-nowrap text-bg-secondary shrink-0 max-sm:text-xs"> {{ experience.startDate }} - {{ experience.endDate }} </span>
      </div>
      <div class="flex flex-wrap gap-1.5 mt-3">
        <span v-for="tech in experience.techStack" :key="tech" class="text-xs px-2 py-0.5 rounded bg-black/20 text-bg-primary whitespace-nowrap font-medium">
          {{ tech }}
        </span>
      </div>
    </div>

    <!-- Tag navigation + filtered highlights -->
    <div class="p-6 flex flex-col gap-4 max-sm:p-3 max-sm:gap-3">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tag in experience.tags"
          :key="tag"
          class="py-1.5 px-3.5 rounded-full border border-border-light bg-bg-secondary text-text-secondary text-sm font-medium transition-all duration-200 whitespace-nowrap hover:border-accent hover:text-accent max-sm:text-xs max-sm:py-1 max-sm:px-2.5"
          :class="activeTag === tag ? 'bg-accent text-bg-primary border-accent font-semibold shadow-[0_4px_8px_rgba(0,0,0,0.2)]' : ''"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>

      <ul class="list-disc pl-5 m-0">
        <li v-for="(highlight, index) in filteredHighlights" :key="index" class="mb-2.5 leading-relaxed text-text-primary last:mb-0 max-sm:text-sm max-sm:mb-2">
          {{ highlight.text }}
        </li>
      </ul>
      <p v-if="filteredHighlights.length === 0" class="text-text-secondary italic m-0">No highlights for this category.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { FullExperience, HighlightTag } from "@/data/models/Experience";

const props = defineProps<{
  experience: FullExperience;
}>();

const activeTag = ref<HighlightTag>("Featured");

const filteredHighlights = computed(() => props.experience.highlights.filter((h) => h.tags.includes(activeTag.value)));
</script>
