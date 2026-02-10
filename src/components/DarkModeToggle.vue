<template>
  <button class="theme-toggle" :class="{ 'theme-toggle--dark': isDark }" aria-label="Toggle dark mode" @click="toggleDarkMode">
    <div class="theme-toggle__container">
      <!-- Sun -->
      <div class="theme-toggle__sun">
        <font-awesome-icon :icon="['fas', 'sun']" />
      </div>
      <!-- Moon -->
      <div class="theme-toggle__moon">
        <font-awesome-icon :icon="['fas', 'moon']" />
      </div>
      <!-- Stars -->
      <div class="theme-toggle__stars">
        <div v-for="n in 3" :key="n" class="star" />
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useTheme } from "@/composables/UseTheme";

const { currentMode, toggleMode } = useTheme();
const isDark = computed(() => currentMode.value === "dark");
const toggleDarkMode = toggleMode;
</script>

<style lang="scss" scoped>
.theme-toggle {
  position: relative;
  width: 3rem;
  height: 1.75rem;
  border-radius: map.get($border-radius, "full");
  background: linear-gradient(to right, map.get(map.get($colors, "primary"), "light"), #4a90e2);
  cursor: pointer;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: background-color var(--toggle-animation-duration) ease;

  &--dark {
    background: linear-gradient(to right, #2c5282, #1a365d);

    .theme-toggle__container {
      transform: translateX(1.25rem);
    }

    .theme-toggle__sun {
      transform: scale(0);
      opacity: 0;
    }

    .theme-toggle__moon {
      transform: scale(1);
      opacity: 1;
    }

    .theme-toggle__stars {
      opacity: 1;
      .star {
        transform: scale(1);
      }
    }
  }

  &__container {
    position: relative;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #ffd700;
    transform: translateX(0);
    transition: transform var(--toggle-animation-duration) ease;
  }

  &__sun {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff9800;
    transform: scale(1);
    opacity: 1;
    transition: all var(--toggle-animation-duration) ease;
  }

  &__moon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transform: scale(0);
    opacity: 0;
    transition: all var(--toggle-animation-duration) ease;
  }

  &__stars {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    opacity: 0;
    transition: opacity var(--toggle-animation-duration) ease;

    .star {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #fff;
      border-radius: 50%;
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
</style>
