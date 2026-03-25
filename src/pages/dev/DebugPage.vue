<template>
  <div class="max-w-[1200px] mx-auto p-8 max-md:p-4">
    <h1 class="text-[2.5rem] mb-4 text-accent text-center">Component Debug Page</h1>
    <p class="text-center mb-12 text-xl text-text-secondary">This page demonstrates all components in isolation with their variants.</p>

    <div class="flex justify-center mb-8">
      <router-link
        to="/debug-carousel"
        class="inline-flex items-center gap-2 py-3 px-6 bg-accent text-bg-primary rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] transition-transform"
      >
        <font-awesome-icon :icon="['fas', 'sliders-h']" />
        Carousel Debug Page
      </router-link>
    </div>

    <!-- Button Component -->
    <section class="mb-16">
      <h2 class="text-[1.8rem] mb-6 pb-2 border-b border-border text-accent-light">Button Component</h2>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] max-md:grid-cols-1 gap-8">
        <!-- Default Button -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Default Button</h3>
          <g-button label="Default Button" />
        </div>

        <!-- Default Button with Icon -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Default Button with Icon</h3>
          <g-button label="Default Button" icon="close" />
        </div>

        <!-- Button with Icon -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Label Right + Icon</h3>
          <g-button label="Label Right" icon="arrow-right" label-pos="right" />
        </div>

        <!-- Button with Icon Left -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Label Left + Icon</h3>
          <g-button label="Label Left" icon="arrow-left" label-pos="left" />
        </div>

        <!-- Button with Icon Above -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Label Above + Icon</h3>
          <g-button label="Label Above" icon="arrow-up" label-pos="above" />
        </div>

        <!-- Button with Icon Below -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Label Below + Icon</h3>
          <g-button label="Label Below" icon="arrow-down" label-pos="below" />
        </div>

        <!-- Button Shapes -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Shape: Rounded</h3>
          <g-button label="Rounded Button" shape="rounded" />
        </div>

        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Shape: Squircle (Default)</h3>
          <g-button label="Squircle Button" shape="squircle" />
        </div>

        <!-- Button Borders -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Border: Thin</h3>
          <g-button label="Thin Border" border="thin" />
        </div>

        <!-- Icon Sizes -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Icon Size: Small (Default)</h3>
          <g-button label="Small Icon" icon="star" icon-size="sm" />
        </div>

        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Icon Size: Medium</h3>
          <g-button label="Medium Icon" icon="star" icon-size="md" />
        </div>

        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Icon Size: Large</h3>
          <g-button label="Large Icon" icon="star" icon-size="lg" />
        </div>

        <!-- Icon Size with Different Label Positions -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Large Icon + Label Below</h3>
          <g-button label="Label Below" icon="star" icon-size="lg" label-pos="below" background="transparent" border="none" />
        </div>

        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Border: Thick</h3>
          <g-button label="Thick Border" border="thick" />
        </div>

        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Border: None</h3>
          <g-button label="No Border" border="none" />
        </div>

        <!-- Button as Link -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Router Link (to="/")</h3>
          <g-button label="Go to Home" to="/" icon="home" />
        </div>

        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">External Link (href)</h3>
          <g-button label="GitHub" href="https://github.com" icon="code-branch" icon-prefix="fab" />
        </div>

        <!-- Custom Background -->
        <div class="bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Custom Background</h3>
          <g-button label="Custom Color" background="rgba(255, 0, 0, 0.3)" />
        </div>
      </div>
    </section>

    <!-- CollapsibleSection Component -->
    <section class="mb-16">
      <h2 class="text-[1.8rem] mb-6 pb-2 border-b border-border text-accent-light">CollapsibleSection Component</h2>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] max-md:grid-cols-1 gap-8">
        <div class="col-span-full">
          <collapsible-section title="Closed by default" :model-value="false">
            <p>This is the content of the collapsible section. It can contain any content.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </collapsible-section>
        </div>

        <div class="col-span-full">
          <collapsible-section title="Open by default" :model-value="true">
            <p>This section is initially open.</p>
            <p>You can toggle it by clicking on the header.</p>
          </collapsible-section>
        </div>
      </div>
    </section>

    <!-- NavBar Component -->
    <section class="mb-16">
      <h2 class="text-[1.8rem] mb-6 pb-2 border-b border-border text-accent-light">NavBar Component</h2>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] max-md:grid-cols-1 gap-8">
        <div class="col-span-full bg-bg-tertiary rounded-lg p-6">
          <h3 class="text-xl mb-4 text-text-secondary">Navigation Bar (Normal)</h3>
          <div class="border border-border rounded-lg overflow-hidden">
            <nav-bar />
          </div>
          <p class="mt-4">Try toggling dev mode to see additional nav items</p>
        </div>

        <div class="col-span-full bg-bg-tertiary rounded-lg p-6 narrow-demo-container">
          <h3 class="text-xl mb-4 text-text-secondary">Navigation Bar (Narrow/Mobile View)</h3>
          <div class="border border-border rounded-lg overflow-hidden narrow-demo max-w-[480px] mx-auto !overflow-visible">
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
import CollapsibleSection from "@/components/CollapsibleSection.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped>
/* Force mobile view styles regardless of actual screen width */
.narrow-demo :deep(.hide-on-mobile) {
  display: none !important;
}

.narrow-demo :deep(.menu-toggle) {
  display: flex !important;
  order: -1;
}
</style>
