<template>
  <div class="flex flex-col gap-3">
    <div class="relative">
      <font-awesome-icon icon="search" class="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm" />
      <input
        :value="searchQuery"
        type="text"
        placeholder="Search posts..."
        class="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-secondary border border-border-light text-text-primary placeholder-text-secondary text-sm focus:outline-none focus:border-accent transition-colors duration-fast"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="flex flex-wrap gap-1.5">
      <button
        class="text-sm py-1 px-3 rounded-full border transition-colors duration-fast cursor-pointer"
        :class="
          selectedTag === null
            ? 'bg-accent text-bg-primary border-accent'
            : 'bg-transparent text-text-secondary border-border-light hover:border-accent hover:text-accent'
        "
        @click="$emit('update:selectedTag', null)"
      >
        All
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        class="text-sm py-1 px-3 rounded-full border transition-colors duration-fast cursor-pointer"
        :class="
          selectedTag === tag
            ? 'bg-accent text-bg-primary border-accent'
            : 'bg-transparent text-text-secondary border-border-light hover:border-accent hover:text-accent'
        "
        @click="$emit('update:selectedTag', tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tags: string[];
  selectedTag: string | null;
  searchQuery: string;
}>();

defineEmits<{
  "update:selectedTag": [tag: string | null];
  "update:searchQuery": [query: string];
}>();
</script>
