<template>
  <button
    class="theme-toggle"
    :class="{ 'theme-toggle--dark': isDark }"
    @click="toggleTheme"
    aria-label="Toggle dark mode"
  >
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
        <div class="star" v-for="n in 3" :key="n"></div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const isDark = ref(false);

// Initialize theme from localStorage or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  applyTheme();
});

// Watch for changes and apply theme
watch(isDark, () => {
  applyTheme();
});

const toggleTheme = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("theme", isDark.value ? "dark" : "light");
};

const applyTheme = () => {
  document.documentElement.classList.toggle("dark", isDark.value);
};
</script>

<style lang="scss" scoped>
.theme-toggle {
  position: relative;
  width: 3rem;
  height: 1.75rem;
  border-radius: map-get($border-radius, "full");
  background: linear-gradient(
    to right,
    map-get(map-get($colors, "primary"), "light"),
    #4a90e2
  );
  cursor: pointer;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.1);
  @include transition(background-color, transform);

  &:hover {
    transform: scale(1.05);
  }

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
    transition: transform map-get($transitions, "base") ease;
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
    transition: all map-get($transitions, "base") ease;
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
    transition: all map-get($transitions, "base") ease;
  }

  &__stars {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    opacity: 0;
    transition: opacity map-get($transitions, "base") ease;

    .star {
      position: absolute;
      width: 4px;
      height: 4px;
      background: #fff;
      border-radius: 50%;
      transform: scale(0);
      transition: transform map-get($transitions, "base") ease;

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
</style>
