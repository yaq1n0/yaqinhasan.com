<template>
  <nav class="nav-bar">
    <!-- Overflow Menu Button (Mobile Only) -->
    <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </button>

    <!-- Left Section -->
    <div class="nav-section left">
      <NavBarItem
        v-for="item in structure.left"
        :key="item.label"
        :item="item"
        :class="{ 'hide-on-mobile': item.displayPolicy === 'overflow' }"
      />
    </div>

    <!-- Right Section -->
    <div class="nav-section right">
      <NavBarItem
        v-for="item in structure.right.filter((item) => !item.isButton)"
        :key="item.label"
        :item="item"
      />
      <DarkModeToggle />
    </div>

    <!-- Mobile Overflow Menu -->
    <div v-if="isMenuOpen" class="overflow-menu">
      <NavBarItem
        v-for="item in overflowItems"
        :key="item.label"
        :item="item"
        @click="isMenuOpen = false"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { NavBarStructure } from "@/types/navbar";
import NavBarItemComponent from "./NavBarItem.vue";
import DarkModeToggle from "./DarkModeToggle.vue";

const NavBarItem = NavBarItemComponent;
const isMenuOpen = ref(false);

const structure: NavBarStructure = {
  left: [
    {
      label: "Home",
      to: "/",
      icon: { name: "home" },
      displayPolicy: "always-show",
    },
    {
      label: "About",
      to: "/about",
      displayPolicy: "overflow",
    },
    {
      label: "Projects",
      to: "/projects",
      displayPolicy: "overflow",
    },
    {
      label: "Interests",
      to: "/interests",
      displayPolicy: "overflow",
    },
  ],
  right: [
    {
      label: "Contact",
      to: "/contact",
      icon: { name: "envelope", position: "right" },
      displayPolicy: "always-show",
    },
  ],
};

const overflowItems = computed(() =>
  structure.left.filter((item) => item.displayPolicy === "overflow"),
);
</script>

<style lang="scss" scoped>
.nav-bar {
  @include flex(row, space-between, center);
  position: relative;
  padding: map-get($spacing, "base");
  background: var(--color-bg-secondary);
  border-radius: map-get($border-radius, "base");
  margin: map-get($spacing, "base");

  .nav-section {
    @include flex(row, flex-start, center, "sm");

    &.right {
      margin-left: auto;
    }

    .hide-on-mobile {
      @media (max-width: map-get($breakpoints, "md") - 1px) {
        display: none;
      }
    }
  }

  .menu-toggle {
    @include flex(row, center, center);
    color: var(--color-text-primary);
    font-size: map-get($font-sizes, "xl");
    padding: map-get($spacing, "sm");
    margin-right: map-get($spacing, "base");
    cursor: pointer;
    transition: color map-get($transitions, "base") ease;
    display: none;

    &:hover {
      color: var(--color-accent-light);
    }

    @media (max-width: map-get($breakpoints, "md") - 1px) {
      display: flex;
    }
  }
}

.overflow-menu {
  position: absolute;
  top: 100%;
  left: map-get($spacing, "base");
  background: var(--color-bg-secondary);
  border-radius: map-get($border-radius, "base");
  padding: map-get($spacing, "base");
  margin-top: map-get($spacing, "xs");
  min-width: 200px;
  @include flex(column);
  gap: map-get($spacing, "sm");
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: map-get($z-index, "dropdown");

  @media (min-width: map-get($breakpoints, "md")) {
    display: none;
  }
}
</style>
