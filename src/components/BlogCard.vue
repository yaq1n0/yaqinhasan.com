<template>
  <router-link
    :to="`/blog/${post.slug}`"
    class="block bg-bg-tertiary rounded-xl overflow-hidden transition-all duration-base hover:ring-1 hover:ring-accent-translucent"
  >
    <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" class="w-full h-48 object-cover" />
    <div class="p-5 max-sm:p-4">
      <h3 class="text-lg font-semibold text-accent m-0 leading-snug max-sm:text-base">{{ post.title }}</h3>
      <div class="flex items-center gap-3 mt-1.5 text-sm text-text-secondary">
        <time :datetime="post.date">{{ formattedDate }}</time>
        <span>&middot;</span>
        <span>{{ post.readingTime }} min read</span>
      </div>
      <p class="mt-2 mb-0 text-sm text-text-secondary leading-relaxed line-clamp-2">{{ post.description }}</p>
      <div v-if="post.tags.length" class="flex flex-wrap gap-1.5 mt-3">
        <span v-for="tag in post.tags" :key="tag" class="text-xs py-0.5 px-2 rounded bg-accent-translucent text-accent-light whitespace-nowrap">
          {{ tag }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BlogPost } from "@/data/models/BlogPost";

const props = defineProps<{ post: BlogPost }>();

const formattedDate = computed(() => {
  const d = new Date(props.post.date + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
});
</script>
