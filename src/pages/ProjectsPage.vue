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
import { isProjectId, ProjectId, type FullProject, type CVProject } from "@/data/models/Project";
import cvData from "@/data/cv.json";
import { additionalProjects } from "@/data/projects/additionalProjects";

import { projectHtmlDescriptions } from "@/data/projects/projectHtmlDescriptions";

/** Combine a project with its HTML description if it exists */
const withHtmlDescription = (project: CVProject): FullProject => {
  const projectId = isProjectId(project.id || "") ? (project.id as ProjectId) : undefined;
  const htmlDescription = projectId ? projectHtmlDescriptions[projectId] : undefined;
  return {
    ...project,
    htmlDescription
  };
};

// Merge cv.json projects with additional projects, applying htmlDescription overrides
const allProjects = computed<FullProject[]>(() => [...(cvData.projects ?? []), ...additionalProjects].map((p) => withHtmlDescription(p)));

// Category order and labels
const categoryOrder: { id: string; label: string }[] = [
  { id: "web-app", label: "Web Apps" },
  { id: "desktop-app", label: "Desktop Apps" },
  { id: "other", label: "Other" }
];

// Convert type string to category ID
function typeToCategoryId(type?: string): string {
  if (!type) return "other";
  return type.toLowerCase().replace(/\s+/g, "-");
}

// Only show categories that have projects
const categoryItems = computed<CarouselItem[]>(() => {
  const usedIds = new Set(allProjects.value.map((p) => typeToCategoryId(p.type)));
  return categoryOrder.filter((c) => usedIds.has(c.id));
});

// Group projects by category ID
const projectsByCategory = computed<Record<string, FullProject[]>>(() => {
  const grouped: Record<string, FullProject[]> = {};
  for (const cat of categoryOrder) {
    grouped[cat.id] = [];
  }
  for (const project of allProjects.value) {
    const catId = typeToCategoryId(project.type);
    if (!grouped[catId]) grouped[catId] = [];
    grouped[catId].push(project);
  }
  return grouped;
});

// State for active category
const activeCategory = ref("web-app");

// Initialize with URL hash if present
onMounted(() => {
  const hash = window.location.hash.substring(1);
  if (hash && categoryItems.value.some((item) => item.id === hash)) {
    activeCategory.value = hash;
  }
});
</script>

<style lang="scss" scoped></style>
