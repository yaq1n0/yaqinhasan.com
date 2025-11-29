<template>
  <button class="dev-toggle" :class="{ 'dev-toggle--active': isDevMode }" aria-label="Toggle developer mode" @click="toggleDevMode">
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
        <div v-for="n in 3" :key="n" class="bit">{ }</div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useDevMode } from "@/composables/UseDevMode";

const { isDevMode, toggleDevMode } = useDevMode();
</script>

<style lang="scss" scoped>
.dev-toggle {
  position: relative;
  width: 3rem;
  height: 1.75rem;
  border-radius: map.get($border-radius, "full");
  background: linear-gradient(to right, #6b46c1, #805ad5);
  cursor: pointer;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: background-color var(--toggle-animation-duration) ease;

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
    transition: transform var(--toggle-animation-duration) ease;
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
    transition: all var(--toggle-animation-duration) ease;
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
    transition: all var(--toggle-animation-duration) ease;
  }

  &__bits {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    opacity: 0;
    transition: opacity var(--toggle-animation-duration) ease;

    .bit {
      position: absolute;
      font-size: 0.5rem;
      font-family: var(--font-mono);
      color: #48bb78;
      transform: scale(0);
      transition: transform var(--toggle-animation-duration) ease;

      &:nth-child(1) {
        top: 0;
        right: 0;
        transition-delay: var(--toggle-animation-delay-1);
      }

      &:nth-child(2) {
        top: 0.5rem;
        right: 0.5rem;
        transition-delay: var(--toggle-animation-delay-2);
      }

      &:nth-child(3) {
        top: 0.25rem;
        right: 1rem;
        transition-delay: var(--toggle-animation-delay-3);
      }
    }
  }
}

// Dev mode highlight color
:global(.dev-mode) {
  --color-dev-highlight: #38a169;
}
</style>
