<template>
  <div class="carousel-layout">
    <section class="page-header">
      <h1>{{ title }}</h1>
    </section>

    <!-- Navigation Shortcuts -->
    <CollapsibleSection :title="pickerTitle" :modelValue="true">
      <slot name="picker"></slot>
    </CollapsibleSection>

    <!-- Content Display -->
    <div class="carousel-content">
      <slot name="content"></slot>
    </div>

    <!-- Navigation Controls -->
    <div class="navigation-controls">
      <button @click="previousItem" class="nav-button prev">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button @click="nextItem" class="nav-button next">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CollapsibleSection from './CollapsibleSection.vue';

interface CarouselLayoutProps {
  title: string;
  pickerTitle: string;
  items: string[];
  initialItem?: string;
}

const props = withDefaults(defineProps<CarouselLayoutProps>(), {
  initialItem: ''
});

const activeItem = defineModel<string>('activeItem');

// Initialize with default or provided item
onMounted(() => {
  if (!activeItem.value && props.items.length > 0) {
    activeItem.value = props.initialItem || props.items[0];
  }
  
  // Check for URL hash
  const hash = window.location.hash.substring(1);
  if (hash && props.items.includes(hash)) {
    activeItem.value = hash;
  }
});

// Navigation functions
const nextItem = () => {
  if (!activeItem.value) return;
  const currentIndex = props.items.indexOf(activeItem.value);
  const nextIndex = (currentIndex + 1) % props.items.length;
  activeItem.value = props.items[nextIndex];
};

const previousItem = () => {
  if (!activeItem.value) return;
  const currentIndex = props.items.indexOf(activeItem.value);
  const prevIndex = (currentIndex - 1 + props.items.length) % props.items.length;
  activeItem.value = props.items[prevIndex];
};

// Expose methods for parent components
defineExpose({
  nextItem,
  previousItem
});
</script>

<style lang="scss" scoped>
.carousel-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: map.get($spacing, "xl");
  position: relative;

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }
}

.page-header {
  margin-bottom: map.get($spacing, "xl");
  text-align: center;

  h1 {
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin-bottom: map.get($spacing, "sm");
  }
}

.carousel-content {
  margin-top: map.get($spacing, "xl");
  animation: fadeIn 0.5s ease;
}

.navigation-controls {
  position: fixed;
  top: 50%;
  width: 100%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;

  .nav-button {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-primary);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    pointer-events: auto;
    opacity: 0.7;
    margin: 0 map.get($spacing, "md");

    &:hover {
      opacity: 1;
      background-color: var(--color-accent);
      color: var(--color-bg-primary);
    }

    &.prev {
      margin-left: map.get($spacing, "lg");
    }

    &.next {
      margin-right: map.get($spacing, "lg");
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: map.get($breakpoints, "md")) {
  .navigation-controls {
    .nav-button {
      width: 40px;
      height: 40px;

      &.prev {
        margin-left: map.get($spacing, "sm");
      }

      &.next {
        margin-right: map.get($spacing, "sm");
      }
    }
  }
}
</style> 