<template>
  <div v-show="visible">
    <carousel-detail :title="title" :summary="summary">
      <slot />

      <template v-if="$slots['dev-content']" #dev-content>
        <slot name="dev-content" />
      </template>
    </carousel-detail>
  </div>
</template>

<script setup lang="ts">
import CarouselDetail from "@/components/carousel/CarouselDetail.vue";

defineProps<{
  title: string;
  summary: string;
  visible: boolean;
}>();
</script>
