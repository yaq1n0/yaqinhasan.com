<template>
  <div class="carousel-layout">
    <section class="page-header">
      <h1>{{ title }}</h1>
    </section>

    <!-- Carousel Picker (Top Navigation) -->
    <div class="carousel-picker" :class="{ minimal: minimal }">
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

interface CarouselLayoutProps {
  title: string;
  items: CarouselItem[];
  initialItemId?: string;
  minimal?: boolean;
}

const props = withDefaults(defineProps<CarouselLayoutProps>(), {
  initialItemId: "",
  minimal: false
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

<style lang="scss" scoped>
.carousel-layout {
  margin: 0 auto;
  padding: map.get($spacing, "xl");
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "md") map.get($spacing, "sm");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "sm") map.get($spacing, "xs");
  }
}

.page-header {
  margin-bottom: map.get($spacing, "base");
  text-align: center;
  width: 100%;

  h1 {
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin-bottom: map.get($spacing, "sm");

    @media (max-width: map.get($breakpoints, "md")) {
      font-size: map.get($font-sizes, "2xl");
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "xl");
      margin-bottom: map.get($spacing, "xs");
    }
  }
}

/* Carousel Picker Styles */
.carousel-picker {
  width: 100%;
  position: relative;
  padding: map.get($spacing, "md") 0;
  margin-bottom: map.get($spacing, "xl");
  overflow: hidden;

  // Fade effect on edges
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, var(--color-bg-primary) 0%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, var(--color-bg-primary) 0%, transparent 100%);
  }

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "sm") 0;
    margin-bottom: map.get($spacing, "lg");

    &::before,
    &::after {
      width: 60px;
    }
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "xs") 0;
    margin-bottom: map.get($spacing, "md");

    &::before,
    &::after {
      width: 40px;
    }
  }

  .carousel-swiper {
    overflow: hidden;
    padding: 10px 0;
    margin: 0 -10px;

    @media (max-width: map.get($breakpoints, "sm")) {
      padding: 5px 0;
      margin: 0 -5px;
    }
  }

  .carousel-item {
    width: auto;
    min-width: 180px;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    padding: 0 10px;

    @media (max-width: map.get($breakpoints, "md")) {
      min-width: 150px;
      padding: 0 8px;
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      min-width: 120px;
      padding: 0 5px;
    }

    &:hover {
      transform: scale(1.05);
      z-index: 2;

      @media (max-width: map.get($breakpoints, "sm")) {
        transform: scale(1.02);
      }
    }

    &.active-item {
      transform: scale(1.1);
      z-index: 3;

      @media (max-width: map.get($breakpoints, "sm")) {
        transform: scale(1.05);
      }

      :deep(.btn) {
        font-weight: 600;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        border-color: var(--color-accent);

        @media (max-width: map.get($breakpoints, "sm")) {
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        }
      }
    }

    :deep(.btn) {
      width: 100%;
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      white-space: normal;
      overflow: visible;
      text-overflow: initial;
      padding: map.get($spacing, "xs") map.get($spacing, "md");
      height: auto;
      min-height: 40px;

      @media (max-width: map.get($breakpoints, "md")) {
        padding: map.get($spacing, "xs") map.get($spacing, "sm");
        min-height: 36px;
      }

      @media (max-width: map.get($breakpoints, "sm")) {
        font-size: 0.75rem;
        padding: map.get($spacing, "xs") map.get($spacing, "xs");
        min-height: 32px;
      }

      &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);

        @media (max-width: map.get($breakpoints, "sm")) {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  &.minimal {
    padding: map.get($spacing, "sm") 0;

    @media (max-width: map.get($breakpoints, "sm")) {
      padding: map.get($spacing, "xs") 0;
    }

    .carousel-item {
      min-width: 160px;

      @media (max-width: map.get($breakpoints, "md")) {
        min-width: 130px;
      }

      @media (max-width: map.get($breakpoints, "sm")) {
        min-width: 100px;
      }

      &.active-item {
        transform: scale(1.05);

        @media (max-width: map.get($breakpoints, "sm")) {
          transform: scale(1.03);
        }

        :deep(.btn) {
          border-width: 2px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);

          @media (max-width: map.get($breakpoints, "sm")) {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
          }
        }
      }

      &:hover {
        transform: scale(1.02);

        @media (max-width: map.get($breakpoints, "sm")) {
          transform: scale(1.01);
        }

        :deep(.btn) {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);

          @media (max-width: map.get($breakpoints, "sm")) {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          }
        }
      }

      :deep(.btn) {
        height: auto;
        min-height: 40px;
        white-space: normal;
        overflow: visible;
        text-overflow: initial;
        padding: map.get($spacing, "xs") map.get($spacing, "sm");

        @media (max-width: map.get($breakpoints, "sm")) {
          min-height: 32px;
          font-size: 0.75rem;
          padding: map.get($spacing, "xs") map.get($spacing, "xs");
        }
      }
    }

    &::before,
    &::after {
      width: 60px;

      @media (max-width: map.get($breakpoints, "md")) {
        width: 50px;
      }

      @media (max-width: map.get($breakpoints, "sm")) {
        width: 30px;
      }
    }
  }
}

/* Content Carousel Styles */
.carousel-content {
  margin-top: map.get($spacing, "xl");
  width: 100%;

  @media (max-width: map.get($breakpoints, "md")) {
    margin-top: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    margin-top: map.get($spacing, "md");
  }

  .content-swiper {
    width: 100%;
    overflow: hidden;
    border-radius: map.get($border-radius, "lg");
    transition: height 0.3s ease;

    @media (max-width: map.get($breakpoints, "sm")) {
      border-radius: map.get($border-radius, "md");
    }
  }
}

/* Touch-specific optimizations */
@media (hover: none) and (pointer: coarse) {
  .carousel-picker {
    .carousel-item {
      &:hover {
        transform: none;
      }

      :deep(.btn) {
        &:hover {
          box-shadow: none;
        }
      }
    }
  }
}
</style>
