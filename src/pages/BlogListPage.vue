<template>
  <main class="max-w-[900px] mx-auto pt-8 px-4 pb-12 sm:pt-12 sm:px-6">
    <h1 class="text-3xl font-bold text-accent-light m-0 max-sm:text-2xl">Blog</h1>
    <p class="mt-2 mb-6 text-text-secondary">Thoughts on software engineering, tools, and things I've built.</p>

    <blog-tag-filter v-model:selected-tag="selectedTag" v-model:search-query="searchQuery" :tags="allTags" />

    <div v-if="filteredPosts.length" class="mt-6 grid gap-4">
      <blog-card v-for="post in filteredPosts" :key="post.slug" :post="post" />
    </div>

    <div v-else class="mt-12 text-center text-text-secondary">
      <p class="text-lg">No posts found.</p>
      <button
        v-if="selectedTag || searchQuery"
        class="mt-2 text-accent hover:text-accent-light transition-colors duration-fast cursor-pointer"
        @click="
          selectedTag = null;
          searchQuery = '';
        "
      >
        Clear filters
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import BlogCard from "@/components/BlogCard.vue";
import BlogTagFilter from "@/components/BlogTagFilter.vue";
import { blogPosts, allTags } from "@/data/blog/blogPosts";

useHead({
  title: "Blog | Yaqin Hasan",
  meta: [
    { name: "description", content: "Blog posts by Yaqin Hasan — software engineering, tools, and project deep-dives." },
    { property: "og:title", content: "Blog | Yaqin Hasan" },
    { property: "og:description", content: "Blog posts by Yaqin Hasan — software engineering, tools, and project deep-dives." },
    { property: "og:type", content: "website" }
  ]
});

const route = useRoute();
const selectedTag = ref<string | null>(null);

onMounted(() => {
  const tagParam = route.query.tag as string | undefined;
  if (tagParam && allTags.includes(tagParam)) {
    selectedTag.value = tagParam;
  }
});
const searchQuery = ref("");

const filteredPosts = computed(() => {
  let posts = blogPosts;

  if (selectedTag.value) {
    posts = posts.filter((p) => p.tags.includes(selectedTag.value!));
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    posts = posts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return posts;
});
</script>
