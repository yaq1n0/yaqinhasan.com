<template>
  <button
    class="dev-toggle"
    :class="{ 'dev-toggle--active': isDevMode }"
    @click="toggleDevMode"
    aria-label="Toggle developer mode"
  >
    <div class="dev-toggle__container">
      <!-- Normal Mode -->
      <div class="dev-toggle__normal">
        <font-awesome-icon :icon="['fas', 'code']" />
      </div>
      <!-- Dev Mode -->
      <div class="dev-toggle__dev">
        <font-awesome-icon :icon="['fas', 'terminal']" />
      </div>
      <!-- Code Bits -->
      <div class="dev-toggle__bits">
        <div class="bit" v-for="n in 3" :key="n">{ }</div>
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
  position: relative;
  width: 3rem;
  height: 1.75rem;
  border-radius: map.get($border-radius, "full");
  background: linear-gradient(
    to right,
    #6b46c1,
    #805ad5
  );
  cursor: pointer;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.1);
  @include transition(background-color, transform);

  &:hover {
    transform: scale(1.05);
  }

  &--active {
    background: linear-gradient(to right, #38a169, #48bb78);

    .dev-toggle__container {
      transform: translateX(1.25rem);
    }

    .dev-toggle__normal {
      transform: scale(0);
      opacity: 0;
    }

    .dev-toggle__dev {
      transform: scale(1);
      opacity: 1;
    }

    .dev-toggle__bits {
      opacity: 1;
      .bit {
        transform: scale(1);
      }
    }
  }

  &__container {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #e2e8f0;
    transform: translateX(0);
    transition: transform map.get($transitions, "base") ease;
  }

  &__normal {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b46c1;
    transform: scale(1);
    opacity: 1;
    transition: all map.get($transitions, "base") ease;
  }

  &__dev {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #38a169;
    transform: scale(0);
    opacity: 0;
    transition: all map.get($transitions, "base") ease;
  }

  &__bits {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    opacity: 0;
    transition: opacity map.get($transitions, "base") ease;

    .bit {
      position: absolute;
      font-size: 0.5rem;
      font-family: var(--font-mono);
      color: #48bb78;
      transform: scale(0);
      transition: transform map.get($transitions, "base") ease;

      &:nth-child(1) {
        top: 0;
        right: 0;
        transition-delay: 0.1s;
      }

      &:nth-child(2) {
        top: 0.5rem;
        right: 0.5rem;
        transition-delay: 0.2s;
      }

      &:nth-child(3) {
        top: 0.25rem;
        right: 1rem;
        transition-delay: 0.3s;
      }
    }
  }
}

// Add styles for dev mode elements
:global(.dev-mode) {
  --color-dev-highlight: #38a169;

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
