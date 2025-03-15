<template>
  <button
    class="dev-toggle"
    :class="{ 'dev-toggle--active': isDevMode }"
    @click="toggleDevMode"
    aria-label="Toggle developer mode"
  >
    <div class="dev-toggle__container">
      <div class="dev-toggle__code">&lt;/&gt;</div>
      <div class="dev-toggle__switch">
        <div class="slider" :class="{ active: isDevMode }"></div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const isDevMode = ref(false);

// Initialize dev mode from sessionStorage
onMounted(() => {
  const savedMode = sessionStorage.getItem("devMode");
  if (savedMode) {
    isDevMode.value = savedMode === "true";
  } else {
    isDevMode.value = false;
    sessionStorage.setItem("devMode", "false");
  }
  applyDevMode();
});

// Watch for changes and apply dev mode
watch(isDevMode, () => {
  applyDevMode();
});

const toggleDevMode = () => {
  isDevMode.value = !isDevMode.value;
  sessionStorage.setItem("devMode", isDevMode.value ? "true" : "false");
};

const applyDevMode = () => {
  const root = document.documentElement;
  if (isDevMode.value) {
    root.classList.add("dev-mode");
  } else {
    root.classList.remove("dev-mode");
  }

  // Emit event for other components to react to dev mode changes
  window.dispatchEvent(
    new CustomEvent("devModeChanged", {
      detail: { isDevMode: isDevMode.value },
    }),
  );
};
</script>

<style lang="scss" scoped>
.dev-toggle {
  @include flex(row, center, center);
  cursor: pointer;
  background: transparent;
  border: none;
  padding: map.get($spacing, "sm");
  transition: all map.get($transitions, "base") ease;

  &__container {
    @include flex(row, center, center, "xs");
  }

  &__code {
    font-family: var(--font-mono);
    font-weight: bold;
    font-size: map.get($font-sizes, "base");
    color: var(--color-text-primary);
    white-space: nowrap;
  }

  &__switch {
    position: relative;
    width: 40px;
    height: 20px;
    background-color: var(--color-bg-tertiary);
    border-radius: 10px;
    transition: all map.get($transitions, "base") ease;

    .slider {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background-color: var(--color-text-primary);
      border-radius: 50%;
      transition: all map.get($transitions, "base") ease;

      &.active {
        left: 22px;
        background-color: var(--color-accent);
      }
    }
  }

  &--active {
    .dev-toggle__code {
      color: var(--color-accent);
    }

    .dev-toggle__switch {
      background-color: var(--color-accent-light);
    }
  }

  &:hover {
    .dev-toggle__code {
      color: var(--color-accent-light);
    }
  }
}

// Add styles for dev mode elements
:global(.dev-mode) {
  --color-dev-highlight: #9c27b0;

  .show-dev-only {
    display: block !important;
    border-color: var(--color-dev-highlight);
  }
}

// Hide dev-only elements by default
:global(.show-dev-only) {
  display: none !important;
}
</style>
