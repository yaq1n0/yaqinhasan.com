<template>
  <nav ref="navBarRef" class="nav-bar" :class="{ 'menu-open': isMenuOpen }">
    <div class="nav-content">
      <!-- Overflow Menu Button (Mobile Only) -->
      <g-button class="menu-toggle" icon="bars" border="none" background="transparent" label="" aria-label="Toggle menu" @click="isMenuOpen = !isMenuOpen" />

      <!-- Left Section -->
      <div class="nav-section left">
        <g-button
          v-for="item in structure.left"
          :key="item.label"
          :label="item.label"
          :to="item.to"
          :icon="item.icon?.name || ''"
          :icon-prefix="item.icon?.prefix || 'fas'"
          border="none"
          background="transparent"
          :class="{ 'hide-on-mobile': item.displayPolicy === 'overflow' }"
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

    <!-- Mobile Overflow Menu -->
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
      <p>"All programming languages are just wrappers for assembly" - Yaqin (2024)</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { NavBarStructure } from "@/components/navbar/navbar";
import GButton from "@/components/GButton.vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import DevModeToggle from "@/components/DevModeToggle.vue";
import { useDevMode } from "@/composables/UseDevMode";

const navBarRef = ref<HTMLElement | null>(null);
const isMenuOpen = ref(false);
const { isDevMode } = useDevMode();
const isNarrowView = ref(false);
const NARROW_THRESHOLD = 768; // Width threshold for narrow view

// Initialize component
onMounted(() => {
  // Define event handlers
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (isMenuOpen.value && !target.closest(".nav-bar")) {
      isMenuOpen.value = false;
    }
  };

  // Close menu when clicking outside
  document.addEventListener("click", handleOutsideClick);

  // Create ResizeObserver
  let resizeObserver: ResizeObserver | null = null;

  // Use ResizeObserver to detect container width changes
  if (navBarRef.value) {
    const checkWidth = () => {
      if (navBarRef.value) {
        // Check if we're in a narrow demo via data attribute
        const isInNarrowDemo = navBarRef.value.dataset.narrowDemo === "true";

        // Get the actual width of the navbar
        const navBarWidth = navBarRef.value.getBoundingClientRect().width;

        // Set narrow view if width is below threshold or if we're in a narrow demo
        isNarrowView.value = navBarWidth < NARROW_THRESHOLD || isInNarrowDemo;

        // Close menu when resizing to desktop size
        if (!isNarrowView.value && isMenuOpen.value) {
          isMenuOpen.value = false;
        }
      }
    };

    // Initial check
    checkWidth();

    // Create and start observing
    resizeObserver = new ResizeObserver(checkWidth);
    resizeObserver.observe(navBarRef.value);
  }

  // Clean up all event listeners and observers
  onUnmounted(() => {
    // Clean up ResizeObserver
    if (resizeObserver) {
      if (navBarRef.value) {
        resizeObserver.unobserve(navBarRef.value);
      }
      resizeObserver.disconnect();
    }

    // Clean up other event listeners
    document.removeEventListener("click", handleOutsideClick);
  });
});

const structure: NavBarStructure = {
  left: [
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
  ],
  right: [
    {
      label: "Contact",
      to: "/contact",
      icon: { name: "envelope", position: "right" },
      displayPolicy: "always-show"
    },
    {
      label: "debug",
      to: "/debug",
      icon: { name: "info-circle" },
      displayPolicy: "dev-only"
    }
  ]
};

const visibleRightItems = computed(() =>
  structure.right.filter((item) => item.displayPolicy !== "dev-only" || (item.displayPolicy === "dev-only" && isDevMode.value && !isNarrowView.value))
);

const overflowItems = computed(() => [
  ...structure.left.filter((item) => item.displayPolicy === "overflow"),
  ...structure.right.filter((item) => item.displayPolicy === "dev-only" && isDevMode.value && isNarrowView.value)
]);
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
  display: none;
  min-width: auto !important;
  min-height: auto !important;
  padding: 0.5rem !important;

  @media (max-width: 768px) {
    display: flex;
    order: -1;
  }

  // Hide the empty label
  :deep(.btn-label) {
    display: none;
  }
}

.hide-on-mobile {
  @media (max-width: 768px) {
    display: none !important;
  }
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
