<template>
  <div class="carousel-layout">
    <section class="page-header">
      <h1>{{ title }}</h1>
    </section>

    <!-- Carousel Picker (Top Navigation) -->
    <div class="carousel-picker">
      <swiper
        :modules="[FreeMode, A11y]"
        :slides-per-view="'auto'"
        :space-between="0"
        :centered-slides="true"
        :grab-cursor="true"
        :speed="600"
        :free-mode="{ enabled: true, sticky: true }"
        class="carousel-swiper"
        @swiper="onPickerSwiperInit"
        @slide-change="onPickerSlideChange"
      >
        <swiper-slide v-for="item in items" :key="item.id" :class="{ 'active-item': activeItemId === item.id }" class="carousel-item">
          <slot name="carousel-item" :item="item" :active="activeItemId === item.id">
            <g-button
              :label="item.label"
              shape="rounded"
              border="thin"
              :background="activeItemId === item.id ? 'var(--color-accent)' : 'var(--color-bg-secondary)'"
              :color="activeItemId === item.id ? 'var(--color-bg-primary)' : 'var(--color-text)'"
              @click="selectItem(item.id)"
            />
          </slot>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Content Display -->
    <div class="carousel-content">
      <swiper
        :modules="[A11y]"
        :slides-per-view="1"
        :space-between="30"
        :speed="400"
        :auto-height="true"
        :allow-touch-move="true"
        :grab-cursor="true"
        class="content-swiper"
        @swiper="onContentSwiperInit"
        @slide-change="onContentSlideChange"
      >
        <swiper-slide v-for="item in items" :key="item.id">
          <slot :active-item="item" :items="items" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import GButton from "@/components/GButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { CarouselItem } from "@/data/models/CarouselItem";

// Import Swiper styles
import "swiper/css";

type CarouselLayoutProps = {
  title: string;
  items: CarouselItem[];
  initialItemId?: string;
};

const props = withDefaults(defineProps<CarouselLayoutProps>(), {
  initialItemId: ""
});

// State
const activeItemId = ref(props.initialItemId || props.items[0]?.id || "");
const pickerSwiper = ref<SwiperType | null>(null);
const contentSwiper = ref<SwiperType | null>(null);

// Initialize Swiper instances
const onPickerSwiperInit = (swiper: SwiperType) => {
  pickerSwiper.value = swiper;

  // Set initial slide
  if (props.initialItemId) {
    const initialIndex = props.items.findIndex((item) => item.id === props.initialItemId);
    if (initialIndex !== -1) {
      swiper.slideTo(initialIndex, 0);
    }
  }
};

const onContentSwiperInit = (swiper: SwiperType) => {
  contentSwiper.value = swiper;

  // Set initial slide
  if (props.initialItemId) {
    const initialIndex = props.items.findIndex((item) => item.id === props.initialItemId);
    if (initialIndex !== -1) {
      swiper.slideTo(initialIndex, 0);
    }
  }
};

// Handle slide changes
const onPickerSlideChange = (swiper: SwiperType) => {
  const activeIndex = swiper.activeIndex;
  if (props.items[activeIndex]) {
    activeItemId.value = props.items[activeIndex].id;

    // Sync content swiper
    if (contentSwiper.value && contentSwiper.value.activeIndex !== activeIndex) {
      contentSwiper.value.slideTo(activeIndex);
    }

    // Update URL hash
    if (typeof window !== "undefined") {
      window.location.hash = props.items[activeIndex].id;
    }
  }
};

const onContentSlideChange = (swiper: SwiperType) => {
  const activeIndex = swiper.activeIndex;
  if (props.items[activeIndex]) {
    activeItemId.value = props.items[activeIndex].id;

    // Sync picker swiper
    if (pickerSwiper.value && pickerSwiper.value.activeIndex !== activeIndex) {
      pickerSwiper.value.slideTo(activeIndex);
    }

    // Update URL hash
    if (typeof window !== "undefined") {
      window.location.hash = props.items[activeIndex].id;
    }
  }
};

// Select a specific item
const selectItem = (itemId: string) => {
  const index = props.items.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    activeItemId.value = itemId;

    // Update both swipers
    if (pickerSwiper.value) {
      pickerSwiper.value.slideTo(index);
    }

    if (contentSwiper.value) {
      contentSwiper.value.slideTo(index);
    }

    // Update URL hash
    if (typeof window !== "undefined") {
      window.location.hash = itemId;
    }
  }
};

// Initialize from URL hash if present
onMounted(() => {
  if (typeof window !== "undefined") {
    const hash = window.location.hash.substring(1);
    if (hash && props.items.some((item) => item.id === hash)) {
      selectItem(hash);
    }
  }
});

// Watch for external changes to initialItemId
watch(
  () => props.initialItemId,
  (newId) => {
    if (newId && newId !== activeItemId.value) {
      selectItem(newId);
    }
  }
);

// Expose methods for parent components
defineExpose({
  selectItem
});
</script>

<style scoped>
.carousel-layout {
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  margin-bottom: 2rem;
  gap: 1.5rem;
}

.page-header {
  text-align: center;
}

.page-header h1 {
  font-size: 1.875rem;
  color: var(--color-accent);
  margin: 0;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.5rem;
  }
}

@media (max-width: 640px) {
  .page-header h1 {
    font-size: 1.25rem;
  }
}

.carousel-picker {
  position: relative;
  overflow: hidden;
}

.carousel-picker::before,
.carousel-picker::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
  z-index: 2;
  pointer-events: none;
}

.carousel-picker::before {
  left: 0;
  background: linear-gradient(to right, var(--color-bg-primary), transparent);
}

.carousel-picker::after {
  right: 0;
  background: linear-gradient(to left, var(--color-bg-primary), transparent);
}

@media (max-width: 640px) {
  .carousel-picker::before,
  .carousel-picker::after {
    width: 30px;
  }
}

.carousel-picker .carousel-swiper {
  overflow: hidden;
}

.carousel-picker .carousel-item {
  width: auto;
  min-width: 120px;
  transition: transform 0.3s ease;
  padding: 0 0.5rem;
}

.carousel-picker .carousel-item.active-item :deep(.btn) {
  font-weight: 600;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border-color: var(--color-accent);
}

.carousel-picker .carousel-item :deep(.btn) {
  width: 100%;
  transition: all 0.3s ease;
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
  height: auto;
  min-height: 36px;
}

@media (max-width: 640px) {
  .carousel-picker .carousel-item :deep(.btn) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    min-height: 32px;
  }
}

.carousel-content {
  width: 100%;
}

.carousel-content .content-swiper {
  overflow: hidden;
  border-radius: 0.75rem;
  transition: height 0.3s ease;
}
</style>
