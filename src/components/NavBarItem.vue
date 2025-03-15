<template>
  <component
    :is="componentType"
    :to="item.to"
    :href="item.href"
    :class="['nav-item', { 'nav-button': item.isButton }]"
    @click="item.onClick"
    :target="item.href ? '_blank' : undefined"
  >
    <font-awesome-icon
      v-if="item.icon && item.icon.position !== 'right'"
      :icon="[item.icon.prefix || 'fas', item.icon.name]"
      class="icon-left"
    />
    <span class="label">{{ item.label }}</span>
    <font-awesome-icon
      v-if="item.icon && item.icon.position === 'right'"
      :icon="[item.icon.prefix || 'fas', item.icon.name]"
      class="icon-right"
    />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { NavBarItem } from "@/data/navbar";

const props = defineProps<{
  item: NavBarItem;
}>();

const componentType = computed(() => {
  if (props.item.to) return "router-link";
  if (props.item.href) return "a";
  return "button";
});
</script>

<style lang="scss" scoped>
.nav-item {
  @include flex(row, center, center);
  text-decoration: none;
  color: map.get(map.get($colors, "text"), "primary");
  padding: map.get($spacing, "sm") map.get($spacing, "base");
  margin: 0 map.get($spacing, "xs");
  border-radius: map.get($border-radius, "sm");
  @include font-size("sm");
  border: none;
  background: none;
  cursor: pointer;
  transition: all map.get($transitions, "base") ease;

  &:hover {
    background-color: map.get(map.get($colors, "background"), "light");
    transform: translateY(-1px);
  }

  &.nav-button {
    background: map.get(map.get($colors, "background"), "light");

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  .icon-left {
    margin-right: map.get($spacing, "sm");
  }

  .icon-right {
    margin-left: map.get($spacing, "sm");
  }
}

// In mobile menu
.overflow-menu .nav-item {
  width: 100%;
  justify-content: flex-start;
  margin: 0;

  @include breakpoint("md") {
    width: auto;
  }
}
</style>
