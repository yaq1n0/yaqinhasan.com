<template>
  <carousel-layout title="Personal Projects" :items="categoryItems" :initial-item-id="activeCategory">
    <template #default="{ activeItem }">
      <div v-for="category in categoryItems" v-show="activeItem.id === category.id" :key="category.id">
        <project-card v-for="project in projectsByCategory[category.id]" :key="project.name" :project="project" />
      </div>
    </template>
  </carousel-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import CarouselLayout from "@/components/carousel/CarouselLayout.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import { type CarouselItem } from "@/data/models/CarouselItem";
import type { FullProject } from "@/data/models/Project";
import { fullProjects } from "@/data/projects/projectHelpers";
import { useDevMode } from "@/composables/UseDevMode";

const { isDevMode } = useDevMode();

// Group projects by category; uncategorized → "Other". "Joke" only visible in dev mode.
const projectsByCategory = computed(() => {
  const groups: Record<string, FullProject[]> = {};
  for (const project of fullProjects) {
    const cat = project.category ?? "Other";
    if (cat === "Joke" && !isDevMode.value) continue;
    (groups[cat] ??= []).push(project);
  }
  return groups;
});

const categoryItems = computed<CarouselItem[]>(() => Object.keys(projectsByCategory.value).map((id) => ({ id, label: id })));

// State for active category
const activeCategory = ref("Web");

// Initialize with URL hash if present
onMounted(() => {
  const hash = window.location.hash.substring(1);
  if (hash && categoryItems.value.some((item) => item.id === hash)) {
    activeCategory.value = hash;
  }
});
</script>
