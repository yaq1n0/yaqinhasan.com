<template>
  <div class="contact-box">
    <g-button v-for="(item, index) in items" :key="index" v-bind="item" label-pos="below" shape="squircle" border="none" background="transparent" />
  </div>
</template>

<script setup lang="ts">
import GButton from "@/components/GButton.vue";
import type { ContactItem } from "../data/models/Button";

defineProps<{
  items: ContactItem[];
}>();
</script>

<style lang="scss" scoped>
.contact-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map.get($spacing, "lg");
  margin: map.get($spacing, "lg") 0;
  padding: map.get($spacing, "md");
  border-radius: map.get($border-radius, "lg");
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: map.get($breakpoints, "md")) {
  .contact-box {
    gap: map.get($spacing, "md");
  }
}
</style>
