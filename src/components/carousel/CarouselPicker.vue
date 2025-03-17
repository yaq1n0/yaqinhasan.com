<template>
  <div 
    class="carousel-picker" 
    :class="{ 'minimal': minimal }"
    @mouseenter="pauseAutoScroll"
    @mouseleave="resumeAutoScroll"
    @touchstart="pauseAutoScroll"
    @touchend="resumeAutoScroll"
  >
    <div class="carousel-container">
      <div class="fade-edge left" />
      
      <div 
        ref="carouselTrack"
        class="carousel-track"
        :style="{ transform: `translateX(${translateX}px)` }"
      >
        <!-- Clone of last items (for infinite loop) -->
        <div class="carousel-items clone-end">
          <Button
            v-for="item in clonedEndItems"
            :key="`end-${item.id}`"
            :label="item.label"
            :class="{ 'active-item': modelValue === item.id }"
            shape="rounded"
            border="thin"
            :background="modelValue === item.id ? 'var(--color-accent)' : 'var(--color-bg-secondary)'"
            :color="modelValue === item.id ? 'var(--color-bg-primary)' : 'var(--color-text)'"
            @click="selectItem(item.id)"
          />
        </div>
        
        <!-- Main items -->
        <div class="carousel-items main">
          <Button
            v-for="item in items"
            :key="item.id"
            :label="item.label"
            :class="{ 'active-item': modelValue === item.id }"
            shape="rounded"
            border="thin"
            :background="modelValue === item.id ? 'var(--color-accent)' : 'var(--color-bg-secondary)'"
            :color="modelValue === item.id ? 'var(--color-bg-primary)' : 'var(--color-text)'"
            @click="selectItem(item.id)"
          />
        </div>
        
        <!-- Clone of first items (for infinite loop) -->
        <div class="carousel-items clone-start">
          <Button
            v-for="item in clonedStartItems"
            :key="`start-${item.id}`"
            :label="item.label"
            :class="{ 'active-item': modelValue === item.id }"
            shape="rounded"
            border="thin"
            :background="modelValue === item.id ? 'var(--color-accent)' : 'var(--color-bg-secondary)'"
            :color="modelValue === item.id ? 'var(--color-bg-primary)' : 'var(--color-text)'"
            @click="selectItem(item.id)"
          />
        </div>
      </div>
      
      <div class="fade-edge right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import Button from '@/components/GButton.vue';

interface CarouselItem {
  id: string;
  label: string;
}

const props = defineProps<{
  items: CarouselItem[];
  /**
   * When true, the component will use a minimal style without borders, backgrounds, etc.
   * Useful when embedded in other components that already provide structure
   */
  minimal?: boolean;
  /**
   * Speed of auto-scrolling in pixels per second
   */
  scrollSpeed?: number;
  /**
   * Number of items to clone at each end for smooth infinite scrolling
   */
  cloneCount?: number;
}>();

const modelValue = defineModel<string>({ required: true });

const carouselTrack = ref<HTMLElement | null>(null);
const translateX = ref(0);
const isScrollPaused = ref(false);
const lastTimestamp = ref(0);
const totalWidth = ref(0);
const itemWidth = ref(0);
const visibleItems = ref(0);
const cloneWidth = ref(0);

// Clone items for infinite scrolling
const clonedStartItems = computed(() => {
  const count = props.cloneCount || 3;
  return props.items.slice(0, count);
});

const clonedEndItems = computed(() => {
  const count = props.cloneCount || 3;
  return props.items.slice(-count);
});

const selectItem = (itemId: string) => {
  modelValue.value = itemId;
};

// Auto-scrolling animation
const animate = (timestamp: number) => {
  if (!lastTimestamp.value) {
    lastTimestamp.value = timestamp;
  }
  
  const elapsed = timestamp - lastTimestamp.value;
  lastTimestamp.value = timestamp;
  
  if (!isScrollPaused.value) {
    // Calculate scroll amount based on elapsed time and speed
    const scrollAmount = (props.scrollSpeed || 30) * (elapsed / 1000);
    translateX.value -= scrollAmount;
    
    // Handle infinite scrolling
    if (translateX.value < -totalWidth.value) {
      // If we've scrolled past all real items, jump back to start without animation
      translateX.value = -cloneWidth.value;
    } else if (translateX.value > 0) {
      // If we've scrolled backwards past the start, jump to end without animation
      translateX.value = -(totalWidth.value - cloneWidth.value);
    }
  }
  
  requestAnimationFrame(animate);
};

const pauseAutoScroll = () => {
  isScrollPaused.value = true;
};

const resumeAutoScroll = () => {
  isScrollPaused.value = false;
};

// Calculate dimensions for proper scrolling
const calculateDimensions = () => {
  if (!carouselTrack.value) return;
  
  const trackWidth = carouselTrack.value.offsetWidth;
  const mainItems = carouselTrack.value.querySelector('.carousel-items.main');
  
  if (mainItems) {
    totalWidth.value = mainItems.clientWidth;
    
    const buttons = mainItems.querySelectorAll('.btn');
    if (buttons.length > 0) {
      itemWidth.value = buttons[0].clientWidth;
      visibleItems.value = Math.floor(trackWidth / itemWidth.value);
    }
    
    const cloneStart = carouselTrack.value.querySelector('.carousel-items.clone-start');
    if (cloneStart) {
      cloneWidth.value = cloneStart.clientWidth;
    }
    
    // Start with the first real item visible
    translateX.value = -cloneWidth.value;
  }
};

// Watch for changes in the selected item to scroll it into view
watch(() => modelValue.value, (newValue) => {
  if (!carouselTrack.value) return;
  
  // Find the index of the selected item
  const selectedIndex = props.items.findIndex((item: CarouselItem) => item.id === newValue);
  if (selectedIndex === -1) return;
  
  // Calculate the position to center the selected item
  const targetPosition = -cloneWidth.value - (selectedIndex * itemWidth.value) + 
                         (carouselTrack.value.offsetWidth / 2) - (itemWidth.value / 2);
  
  // Animate to the target position
  translateX.value = targetPosition;
});

// Setup and cleanup
onMounted(() => {
  calculateDimensions();
  window.addEventListener('resize', calculateDimensions);
  requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateDimensions);
});
</script>

<style lang="scss" scoped>
.carousel-picker {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: map.get($spacing, "md") 0;
}

.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  will-change: transform;
}

.carousel-items {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: map.get($spacing, "md");
  
  :deep(.btn) {
    min-width: 180px;
    max-width: 250px;
    flex-shrink: 0;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    &:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
      z-index: 2;
    }
    
    &.active-item {
      font-weight: 600;
      transform: translateY(-3px) scale(1.1);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      border-color: var(--color-accent);
      z-index: 3;
    }
  }
}

// Edge fading effect
.fade-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  pointer-events: none;
  z-index: 10;
  
  &.left {
    left: 0;
    background: linear-gradient(to right, 
      var(--color-bg-primary) 0%, 
      rgba(var(--color-bg-primary-rgb), 0.9) 30%, 
      rgba(var(--color-bg-primary-rgb), 0) 100%);
  }
  
  &.right {
    right: 0;
    background: linear-gradient(to left, 
      var(--color-bg-primary) 0%, 
      rgba(var(--color-bg-primary-rgb), 0.9) 30%, 
      rgba(var(--color-bg-primary-rgb), 0) 100%);
  }
}

// Minimal style for when embedded in other components
.carousel-picker.minimal {
  padding: map.get($spacing, "sm") 0;
  
  .carousel-items {
    gap: map.get($spacing, "sm");
    
    :deep(.btn) {
      min-width: 140px;
      max-width: 200px;
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      
      &.active-item {
        border-width: 2px;
        transform: translateY(-2px) scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }
      
      &:hover {
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
      }
    }
  }
}

@media (max-width: map.get($breakpoints, "md")) {
  .carousel-items {
    :deep(.btn) {
      min-width: 160px;
    }
  }
  
  .fade-edge {
    width: 60px;
  }
}

@media (max-width: map.get($breakpoints, "sm")) {
  .carousel-items {
    :deep(.btn) {
      min-width: 140px;
    }
  }
  
  .fade-edge {
    width: 40px;
  }
}
</style> 