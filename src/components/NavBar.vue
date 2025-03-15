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
        v-for="item in visibleRightItems"
        :key="item.label"
        :item="item"
      />
      <DarkModeToggle />
      <DevModeToggle />
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

    <!-- Site Banner (Dev Joke) - Only visible in dev mode -->
    <div v-if="isDevMode" class="dev-banner">
      <p>
        "All programming languages are just wrappers for assembly" - Yaqin
        (2024)
      </p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { NavBarStructure } from "@/types/navbar";
import NavBarItemComponent from "./NavBarItem.vue";
import DarkModeToggle from "./DarkModeToggle.vue";
import DevModeToggle from "./DevModeToggle.vue";

const NavBarItem = NavBarItemComponent;
const isMenuOpen = ref(false);
const isDevMode = ref(false);

// Initialize dev mode state
onMounted(() => {
  const savedMode = sessionStorage.getItem("devMode");
  isDevMode.value = savedMode === "true";

  // Listen for dev mode changes
  window.addEventListener("devModeChanged", (event: Event) => {
    const customEvent = event as CustomEvent;
    isDevMode.value = customEvent.detail.isDevMode;
  });
});

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
    {
      label: "site_info",
      to: "/technical",
      displayPolicy: "dev-only",
    },
  ],
};

const visibleRightItems = computed(() =>
  structure.right.filter(
    (item) =>
      item.displayPolicy !== "dev-only" ||
      (item.displayPolicy === "dev-only" && isDevMode.value),
  ),
);

const overflowItems = computed(() =>
  structure.left.filter((item) => item.displayPolicy === "overflow"),
);
</script>

<style lang="scss" scoped>
.nav-bar {
  @include flex(column);
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: map.get($border-radius, "base");
  margin: map.get($spacing, "base");

  // Main navigation row
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-border);
  }

  // Navigation items container
  > div:first-of-type {
    @include flex(row, space-between, center);
    width: 100%;
    padding: map.get($spacing, "base");
  }

  .nav-section {
    @include flex(row, flex-start, center, "sm");

    &.right {
      margin-left: auto;
    }

    .hide-on-mobile {
      @media (max-width: map.get($breakpoints, "md") - 1px) {
        display: none;
      }
    }
  }

  .menu-toggle {
    @include flex(row, center, center);
    color: var(--color-text-primary);
    font-size: map.get($font-sizes, "xl");
    padding: map.get($spacing, "sm");
    margin-right: map.get($spacing, "base");
    cursor: pointer;
    transition: color map.get($transitions, "base") ease;
    display: none;

    &:hover {
      color: var(--color-accent-light);
    }

    @media (max-width: map.get($breakpoints, "md") - 1px) {
      display: flex;
    }
  }

  // Dev banner
  .dev-banner {
    width: 100%;
    padding: map.get($spacing, "base");
    background-color: var(--color-accent-translucent);
    text-align: center;
    animation: fadeIn 0.3s ease-in;

    p {
      font-size: map.get($font-sizes, "lg");
      font-weight: 600;
      color: var(--color-accent-dark);
      margin: 0;
    }

    @media (max-width: map.get($breakpoints, "md")) {
      p {
        font-size: map.get($font-sizes, "base");
      }
    }
  }
}

.overflow-menu {
  position: absolute;
  top: 100%;
  left: map.get($spacing, "base");
  background: var(--color-bg-secondary);
  border-radius: map.get($border-radius, "base");
  padding: map.get($spacing, "base");
  margin-top: map.get($spacing, "xs");
  min-width: 200px;
  @include flex(column);
  gap: map.get($spacing, "sm");
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: map.get($z-index, "dropdown");

  @media (min-width: map.get($breakpoints, "md")) {
    display: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
