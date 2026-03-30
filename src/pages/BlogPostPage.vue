<template>
  <main v-if="post" class="max-w-[750px] mx-auto pt-8 px-4 pb-16 sm:pt-12 sm:px-6">
    <router-link to="/blog" class="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors duration-fast mb-6">
      <font-awesome-icon icon="arrow-left" size="xs" />
      Back to Blog
    </router-link>

    <article>
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-accent-light m-0 leading-tight max-sm:text-2xl">{{ post.title }}</h1>
        <div class="flex items-center gap-3 mt-3 text-sm text-text-secondary">
          <time :datetime="post.date">{{ formattedDate }}</time>
          <span>&middot;</span>
          <span>{{ post.readingTime }} min read</span>
        </div>
        <div v-if="post.tags.length" class="flex flex-wrap gap-1.5 mt-3">
          <router-link
            v-for="tag in post.tags"
            :key="tag"
            :to="{ name: 'blog', query: { tag } }"
            class="text-xs py-0.5 px-2 rounded bg-accent-translucent text-accent-light whitespace-nowrap hover:bg-accent hover:text-bg-primary transition-colors duration-fast"
          >
            {{ tag }}
          </router-link>
        </div>
        <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" class="w-full rounded-xl mt-6 object-cover max-h-[400px]" />
      </header>

      <div class="prose blog-prose max-w-none" v-html="post.htmlContent" />
    </article>

    <nav v-if="prevPost || nextPost" class="mt-12 pt-6 border-t border-border-light flex justify-between gap-4">
      <router-link
        v-if="prevPost"
        :to="`/blog/${prevPost.slug}`"
        class="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-fast"
      >
        <font-awesome-icon icon="arrow-left" size="xs" />
        <span class="line-clamp-1">{{ prevPost.title }}</span>
      </router-link>
      <div v-else />
      <router-link
        v-if="nextPost"
        :to="`/blog/${nextPost.slug}`"
        class="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-fast text-right"
      >
        <span class="line-clamp-1">{{ nextPost.title }}</span>
        <font-awesome-icon icon="arrow-right" size="xs" />
      </router-link>
    </nav>
  </main>

  <main v-else class="max-w-[750px] mx-auto pt-8 px-4 pb-16 sm:pt-12 sm:px-6 text-center">
    <h1 class="text-2xl font-bold text-text-primary">Post not found</h1>
    <p class="mt-2 text-text-secondary">The blog post you're looking for doesn't exist.</p>
    <router-link to="/blog" class="inline-block mt-4 text-accent hover:text-accent-light transition-colors duration-fast"> Back to Blog </router-link>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import { blogPosts, blogPostsBySlug } from "@/data/blog/blogPosts";

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const post = computed(() => blogPostsBySlug[slug.value]);

const currentIndex = computed(() => blogPosts.findIndex((p) => p.slug === slug.value));
const prevPost = computed(() => (currentIndex.value > 0 ? blogPosts[currentIndex.value - 1] : null));
const nextPost = computed(() => (currentIndex.value < blogPosts.length - 1 ? blogPosts[currentIndex.value + 1] : null));

const formattedDate = computed(() => {
  if (!post.value) return "";
  const d = new Date(post.value.date + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
});

useHead(
  computed(() => {
    if (!post.value) return { title: "Post Not Found | Yaqin Hasan" };
    return {
      title: `${post.value.title} | Yaqin Hasan`,
      meta: [
        { name: "description", content: post.value.description },
        { property: "og:title", content: post.value.title },
        { property: "og:description", content: post.value.description },
        { property: "og:type", content: "article" },
        ...(post.value.coverImage ? [{ property: "og:image", content: post.value.coverImage }] : []),
        { property: "article:published_time", content: post.value.date },
        ...post.value.tags.map((tag) => ({ property: "article:tag", content: tag }))
      ]
    };
  })
);
</script>
