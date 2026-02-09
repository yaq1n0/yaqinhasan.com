<template>
  <nav ref="navBarRef" class="nav-bar">
    <div class="nav-content">
      <!-- Left Section -->
      <div class="nav-section left">
        <g-button v-for="item in structure.left" :key="item.label" v-bind="item" border="none" background="transparent" />
      </div>

      <!-- Right Section -->
      <div class="nav-section right">
        <g-button v-for="item in structure.right" :key="item.label" v-bind="item" border="none" background="transparent" />

        <g-button
          icon="terminal"
          border="none"
          background="transparent"
          label=""
          aria-label="Toggle terminal"
          :title="isTerminalOpen ? 'Close terminal' : 'Open terminal'"
          @click="toggleTerminal"
        />
      </div>
    </div>

    <!-- Integrated Terminal-->
    <transition name="terminal-expand">
      <div v-if="isTerminalOpen" class="terminal-container">
        <dev-terminal ref="terminalRef" v-model:open="isTerminalOpen" />
      </div>
    </transition>

    <!-- Site Banner (Dev Joke) - Only visible in dev mode -->
    <div v-if="isDevMode" class="dev-banner">
      <p>{{ randomJoke }}</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import GButton from "@/components/GButton.vue";
import DevTerminal from "@/components/DevTerminal.vue";
import { useDevMode } from "@/composables/UseDevMode";
import { useResizeObserver } from "@vueuse/core";
import { UseJokes } from "@/composables/UseJokes";
import { GitHubLink, LinkedInLink } from "@/data/ExternalLinks";
import { ButtonProps } from "@/data/models/Button";

const navBarRef = ref<HTMLElement>();
const terminalRef = ref<InstanceType<typeof DevTerminal>>();

const isTerminalOpen = ref(false);

const NARROW_THRESHOLD = 768;
const isNarrowView = ref(false);

const { isDevMode } = useDevMode();
const { randomJoke } = UseJokes();

const toggleTerminal = () => {
  isTerminalOpen.value = !isTerminalOpen.value;

  // Focus terminal input after opening
  if (isTerminalOpen.value) {
    nextTick(() => {
      terminalRef.value?.focus();
    });
  }
};

const structure = computed(() => {
  const isNarrow = isNarrowView.value ? true : undefined; // because hideLabel is true | undefined lol

  const homeButton: ButtonProps = {
    label: "Home",
    hideLabel: true,
    to: "/",
    icon: "home"
  };

  const experienceButton: ButtonProps = {
    label: "Experience",
    hideLabel: isNarrow,
    icon: "briefcase",
    to: "/experience"
  };

  const projectsButton: ButtonProps = {
    label: "Projects",
    hideLabel: isNarrow,
    icon: "code",
    to: "/projects"
  };

  const githubButton: ButtonProps = {
    href: GitHubLink,
    label: "GitHub",
    hideLabel: true,
    icon: "github",
    iconPrefix: "fab"
  };

  const linkedinButton: ButtonProps = {
    href: LinkedInLink,
    label: "LinkedIn",
    hideLabel: true,
    icon: "linkedin",
    iconPrefix: "fab"
  };

  return {
    left: [homeButton, experienceButton, projectsButton],
    right: [githubButton, linkedinButton]
  };
});

useResizeObserver(navBarRef, (entries) => {
  const { width } = entries[0].contentRect;
  isNarrowView.value = width < NARROW_THRESHOLD;
});
</script>

<style lang="scss" scoped>
.nav-bar {
  position: relative;
  background: var(--color-bg-secondary);
  border-radius: 0.5rem;
  margin: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
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

// Terminal Container - Seamlessly integrated
.terminal-container {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);

  :deep(.terminal) {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
  }

  :deep(.terminal-header) {
    background: var(--color-bg-tertiary);
    border-bottom: 1px solid var(--color-border);

    &:hover {
      background: var(--color-bg-tertiary);
      cursor: default;
    }
  }

  :deep(.terminal-body) {
    background: #1e1e1e;
  }
}

// Terminal expand animation
.terminal-expand-enter-active,
.terminal-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.terminal-expand-enter-from,
.terminal-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.terminal-expand-enter-to,
.terminal-expand-leave-from {
  max-height: 600px;
  opacity: 1;
}

// Dev banner
.dev-banner {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-accent-translucent);
  text-align: center;

  p {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-accent-dark);
    margin: 0;
  }
}
</style>
