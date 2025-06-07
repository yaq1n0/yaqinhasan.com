<template>
  <nav ref="navBarRef" class="nav-bar" :class="{ 'menu-open': isMenuOpen }">
    <div class="nav-content">
      <!-- Overflow Menu Button  -->
      <g-button
        v-if="isNarrowView"
        class="menu-toggle"
        icon="bars"
        border="none"
        background="transparent"
        label=""
        aria-label="Toggle menu"
        @click="isMenuOpen = !isMenuOpen"
      />

      <!-- Left Section -->
      <div class="nav-section left">
        <g-button
          v-for="item in visibleLeftItems"
          :key="item.label"
          :label="item.label"
          :to="item.to"
          :icon="item.icon?.name || ''"
          :icon-prefix="item.icon?.prefix || 'fas'"
          border="none"
          background="transparent"
        />
      </div>

      <!-- Right Section -->
      <div class="nav-section right">
        <g-button
          v-for="item in visibleRightItems"
          :key="item.label"
          :label="item.label"
          :to="item.to"
          :icon="item.icon?.name || ''"
          :icon-prefix="item.icon?.prefix || 'fas'"
          :label-pos="item.icon?.position === 'right' ? 'left' : 'right'"
          border="none"
          background="transparent"
        />
        <dark-mode-toggle />
        <dev-mode-toggle />
      </div>
    </div>

    <!-- Overflow Menu -->
    <div v-if="isMenuOpen" class="overflow-menu">
      <g-button
        v-for="item in overflowItems"
        :key="item.label"
        :label="item.label"
        :to="item.to"
        :icon="item.icon?.name || ''"
        :icon-prefix="item.icon?.prefix || 'fas'"
        border="none"
        background="transparent"
        class="overflow-item"
        @click="isMenuOpen = false"
      />
    </div>

    <!-- Site Banner (Dev Joke) - Only visible in dev mode -->
    <div v-if="isDevMode" class="dev-banner">
      <p>{{ randomJoke }}</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import GButton from "@/components/GButton.vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import DevModeToggle from "@/components/DevModeToggle.vue";
import { useDevMode } from "@/composables/UseDevMode";
import { onClickOutside, useResizeObserver } from "@vueuse/core";
import { RouteLocationRaw } from "vue-router";
import { UseJokes } from "@/composables/UseJokes";

const navBarRef = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);
const { isDevMode } = useDevMode();
const NARROW_THRESHOLD = 768;
const isNarrowView = ref(false);

const { randomJoke } = UseJokes();

export interface NavBarItem {
  label: string;
  icon?: {
    name: string;
    prefix?: "fas" | "fab" | "far"; // Font Awesome style prefixes
    position?: "left" | "right";
  };
  to?: RouteLocationRaw; // For router links
  href?: string; // For external links
  displayPolicy: "always-show" | "overflow";
  onClick?: () => void; // For clickable items
}

export interface NavBarStructure {
  left: NavBarItem[];
  right: NavBarItem[];
}

onClickOutside(navBarRef, () => isMenuOpen.value && (isMenuOpen.value = false));

useResizeObserver(navBarRef, (entries) => {
  const { width } = entries[0].contentRect;
  isNarrowView.value = width < NARROW_THRESHOLD;
});

const structure = computed<NavBarStructure>(() => {
  const left: NavBarItem[] = [
    {
      label: "Home",
      to: "/",
      icon: { name: "home" },
      displayPolicy: "always-show"
    },
    {
      label: "About",
      to: "/about",
      icon: { name: "user" },
      displayPolicy: "overflow"
    },
    {
      label: "Projects",
      to: "/projects",
      icon: { name: "code" },
      displayPolicy: "overflow"
    },
    {
      label: "Interests",
      to: "/interests",
      icon: { name: "star" },
      displayPolicy: "overflow"
    }
  ];

  const right: NavBarItem[] = [
    {
      label: "Contact",
      to: "/contact",
      icon: { name: "envelope", position: "right" },
      displayPolicy: "always-show"
    }
  ];

  if (isDevMode.value) {
    right.push({
      label: "debug",
      to: "/debug",
      icon: { name: "info-circle" },
      displayPolicy: "overflow"
    });
  }

  return { left, right };
});

const isVisible = (item: NavBarItem) => (isNarrowView.value ? item.displayPolicy === "always-show" : true);

const isOverflow = (item: NavBarItem) => !isVisible(item);

const visibleLeftItems = computed(() => structure.value.left.filter(isVisible));

const visibleRightItems = computed(() => structure.value.right.filter(isVisible));

const overflowItems = computed(() => [...structure.value.left.filter(isOverflow), ...structure.value.right.filter(isOverflow)]);
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-radius 0.2s ease,
    box-shadow 0.2s ease;
  z-index: 100;

  // Remove bottom border radius when overflow menu is open
  &.menu-open {
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0); // Remove bottom shadow when menu is open
  }
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  min-height: 60px;
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &.right {
    margin-left: auto;
  }
}

.menu-toggle {
  min-width: auto !important;
  min-height: auto !important;
  padding: 0.5rem !important;
}

.overflow-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--color-bg-secondary);
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 99; // Slightly lower than navbar to ensure proper stacking
  animation: slideDown 0.2s ease-out;
  max-height: 80vh;
  overflow-y: auto;

  // Create a seamless connection with the navbar
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--color-bg-secondary);
  }
}

.overflow-item {
  width: 100%;
  justify-content: flex-start !important;
  text-align: left !important;

  :deep(.btn-content) {
    justify-content: flex-start;
    width: 100%;
  }

  :deep(.btn-icon) {
    width: 1.2em;
    margin-right: 0.5rem;
  }
}

// Override Button component styles for navbar
:deep(.btn) {
  min-width: auto !important;
  min-height: auto !important;
  padding: 0.5rem 0.75rem !important;

  &:hover {
    transform: none !important;
    box-shadow: none !important;
    background-color: var(--color-bg-tertiary) !important;
  }
}

// Dev banner
.dev-banner {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-accent-translucent);
  text-align: center;
  animation: fadeIn 0.3s ease-in;

  p {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-accent-dark);
    margin: 0;
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
