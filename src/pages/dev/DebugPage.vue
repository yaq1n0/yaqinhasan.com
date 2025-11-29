<template>
  <div class="debug-page">
    <h1>Component Debug Page</h1>
    <p class="description">This page demonstrates all components in isolation with their variants.</p>

    <div class="debug-links">
      <router-link to="/debug-carousel" class="debug-link">
        <font-awesome-icon :icon="['fas', 'sliders-h']" />
        Carousel Debug Page
      </router-link>
    </div>

    <!-- Button Component -->
    <section>
      <h2>Button Component</h2>

      <div class="component-grid">
        <!-- Default Button -->
        <div class="component-variant">
          <h3>Default Button</h3>
          <g-button label="Default Button" />
        </div>

        <!-- Default Button with Icon -->
        <div class="component-variant">
          <h3>Default Button with Icon</h3>
          <g-button label="Default Button" icon="close" />
        </div>

        <!-- Button with Icon -->
        <div class="component-variant">
          <h3>Label Right + Icon</h3>
          <g-button label="Label Right" icon="arrow-right" label-pos="right" />
        </div>

        <!-- Button with Icon Left -->
        <div class="component-variant">
          <h3>Label Left + Icon</h3>
          <g-button label="Label Left" icon="arrow-left" label-pos="left" />
        </div>

        <!-- Button with Icon Above -->
        <div class="component-variant">
          <h3>Label Above + Icon</h3>
          <g-button label="Label Above" icon="arrow-up" label-pos="above" />
        </div>

        <!-- Button with Icon Below -->
        <div class="component-variant">
          <h3>Label Below + Icon</h3>
          <g-button label="Label Below" icon="arrow-down" label-pos="below" />
        </div>

        <!-- Button Shapes -->
        <div class="component-variant">
          <h3>Shape: Rounded</h3>
          <g-button label="Rounded Button" shape="rounded" />
        </div>

        <div class="component-variant">
          <h3>Shape: Squircle (Default)</h3>
          <g-button label="Squircle Button" shape="squircle" />
        </div>

        <!-- Button Borders -->
        <div class="component-variant">
          <h3>Border: Thin</h3>
          <g-button label="Thin Border" border="thin" />
        </div>

        <!-- Icon Sizes -->
        <div class="component-variant">
          <h3>Icon Size: Small (Default)</h3>
          <g-button label="Small Icon" icon="star" icon-size="sm" />
        </div>

        <div class="component-variant">
          <h3>Icon Size: Medium</h3>
          <g-button label="Medium Icon" icon="star" icon-size="md" />
        </div>

        <div class="component-variant">
          <h3>Icon Size: Large</h3>
          <g-button label="Large Icon" icon="star" icon-size="lg" />
        </div>

        <!-- Icon Size with Different Label Positions -->
        <div class="component-variant">
          <h3>Large Icon + Label Below</h3>
          <g-button label="Label Below" icon="star" icon-size="lg" label-pos="below" background="transparent" border="none" />
        </div>

        <div class="component-variant">
          <h3>Border: Thick</h3>
          <g-button label="Thick Border" border="thick" />
        </div>

        <div class="component-variant">
          <h3>Border: None</h3>
          <g-button label="No Border" border="none" />
        </div>

        <!-- Button as Link -->
        <div class="component-variant">
          <h3>Router Link (to="/")</h3>
          <g-button label="Go to Home" to="/" icon="home" />
        </div>

        <div class="component-variant">
          <h3>External Link (href)</h3>
          <g-button label="GitHub" href="https://github.com" icon="code-branch" icon-prefix="fab" />
        </div>

        <!-- Custom Background -->
        <div class="component-variant">
          <h3>Custom Background</h3>
          <g-button label="Custom Color" background="rgba(255, 0, 0, 0.3)" />
        </div>
      </div>
    </section>

    <!-- CollapsibleSection Component -->
    <section>
      <h2>CollapsibleSection Component</h2>

      <div class="component-grid">
        <div class="wide">
          <collapsible-section title="Closed by default" :model-value="false">
            <p>This is the content of the collapsible section. It can contain any content.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </collapsible-section>
        </div>

        <div class="wide">
          <collapsible-section title="Open by default" :model-value="true">
            <p>This section is initially open.</p>
            <p>You can toggle it by clicking on the header.</p>
          </collapsible-section>
        </div>
      </div>
    </section>

    <!-- DarkModeToggle Component -->
    <section>
      <h2>DarkModeToggle Component</h2>

      <div class="component-grid">
        <div class="component-variant">
          <h3>Dark Mode Toggle</h3>
          <dark-mode-toggle />
          <p class="mt-4">Current theme is stored in localStorage</p>
        </div>
      </div>
    </section>

    <!-- DevModeToggle Component -->
    <section>
      <h2>DevModeToggle Component</h2>

      <div class="component-grid">
        <div class="component-variant">
          <h3>Dev Mode Toggle</h3>
          <dev-mode-toggle />
          <p class="mt-4">Toggle to show developer-only content</p>
          <div v-if="isDevMode" class="mt-4 p-4 border rounded">
            <p>This content is only visible in dev mode</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NavBar Component -->
    <section>
      <h2>NavBar Component</h2>

      <div class="component-grid">
        <div class="component-variant wide">
          <h3>Navigation Bar (Normal)</h3>
          <div class="nav-container">
            <nav-bar />
          </div>
          <p class="mt-4">Try toggling dev mode to see additional nav items</p>
        </div>

        <div class="component-variant wide narrow-demo-container">
          <h3>Navigation Bar (Narrow/Mobile View)</h3>
          <div class="nav-container narrow-demo">
            <nav-bar />
          </div>
          <p class="mt-4">This demonstrates how the navbar appears on mobile devices with the overflow menu</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import GButton from "@/components/GButton.vue";
import DarkModeToggle from "@/components/DarkModeToggle.vue";
import CollapsibleSection from "@/components/CollapsibleSection.vue";
import DevModeToggle from "@/components/DevModeToggle.vue";
import NavBar from "@/components/NavBar.vue";
import { useDevMode } from "@/composables/UseDevMode";

const { isDevMode } = useDevMode();
</script>

<style lang="scss" scoped>
.debug-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--color-accent);
    text-align: center;
  }

  .description {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 1.2rem;
    color: var(--color-text-secondary);
  }

  .debug-links {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    .debug-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      background-color: var(--color-accent);
      color: var(--color-bg-primary);
      border-radius: 0.5rem;
      font-weight: 600;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }
    }
  }

  section {
    margin-bottom: 4rem;

    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--color-border);
      color: var(--color-accent-light);
    }
  }

  .component-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;

    .wide {
      grid-column: 1 / -1;
    }
  }

  .component-variant {
    background: var(--color-bg-tertiary);
    border-radius: 0.5rem;
    padding: 1.5rem;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
      color: var(--color-text-secondary);
    }

    .mt-4 {
      margin-top: 1rem;
    }

    .p-4 {
      padding: 1rem;
    }

    .border {
      border: 1px solid var(--color-border);
    }

    .rounded {
      border-radius: 0.5rem;
    }
  }

  .nav-container {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;

    &.narrow-demo {
      max-width: 480px;
      margin: 0 auto;
      overflow: visible;

      // Force mobile view styles regardless of actual screen width
      :deep(.hide-on-mobile) {
        display: none !important;
      }

      :deep(.menu-toggle) {
        display: flex !important;
        order: -1;
      }
    }
  }

  .carousel-demo {
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .debug-page {
    padding: 1rem;

    .component-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
