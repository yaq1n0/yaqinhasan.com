<template>
  <div class="carousel-layout">
    <section class="page-header">
      <h1>{{ title }}</h1>
    </section>

    <!-- Carousel Picker (Top Navigation) -->
    <div class="carousel-picker" :class="{ minimal: minimal }">
      <swiper
        :modules="swiperModules"
        :slides-per-view="'auto'"
        :space-between="0"
        :centered-slides="true"
        :grab-cursor="true"
        :watch-slides-progress="true"
        :speed="600"
        :breakpoints="{
          320: { slidesPerView: 'auto', spaceBetween: 0 },
          480: { slidesPerView: 'auto', spaceBetween: 0 },
          640: { slidesPerView: 'auto', spaceBetween: 0 },
          1024: { slidesPerView: 'auto', spaceBetween: 0 }
        }"
        :free-mode="{ enabled: true, sticky: true }"
        class="carousel-swiper"
        @swiper="onSwiperInit"
        @slide-change="onSlideChange"
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
        :modules="swiperContentModules"
        :slides-per-view="1"
        :space-between="30"
        :effect="'fade'"
        :fade-effect="{ crossFade: true }"
        :speed="400"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: isMobile
        }"
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

      <div class="swiper-pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, onUnmounted } from "vue";
import GButton from "@/components/GButton.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay, A11y, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { CarouselItem } from "@/components/carousel/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface CarouselLayoutProps {
  title: string;
  items: CarouselItem[];
  initialItemId?: string;
  minimal?: boolean;
  scrollSpeed?: number;
  pauseOnHover?: boolean;
  forceCarouselMode?: boolean;
}

const props = withDefaults(defineProps<CarouselLayoutProps>(), {
  initialItemId: "",
  minimal: false,
  scrollSpeed: 30,
  pauseOnHover: true,
  forceCarouselMode: false
});

// Swiper modules
const swiperModules = computed(() => [Pagination, Autoplay, A11y]);
const swiperContentModules = computed(() => [Pagination, EffectFade, A11y]);

// State
const activeItemId = ref(props.initialItemId || props.items[0]?.id || "");
const pickerSwiper = ref<SwiperType | null>(null);
const contentSwiper = ref<SwiperType | null>(null);
const visibleItems = ref(0);
const isMobile = ref(false);

// Check if device is mobile
const checkMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 768;
  }
};

// Initialize Swiper instances
const onSwiperInit = (swiper: SwiperType) => {
  pickerSwiper.value = swiper;

  // Calculate visible items
  if (swiper.el) {
    const swiperWidth = swiper.el.clientWidth;
    const slideWidth = swiper.slides[0]?.clientWidth || 200;
    visibleItems.value = Math.floor(swiperWidth / slideWidth);
  }

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
const onSlideChange = (swiper: SwiperType) => {
  const activeIndex = swiper.activeIndex;
  if (props.items[activeIndex]) {
    activeItemId.value = props.items[activeIndex].id;

    // Sync content swiper
    if (contentSwiper.value && contentSwiper.value.activeIndex !== activeIndex) {
      contentSwiper.value.slideTo(activeIndex);
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
    // Check if mobile
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const hash = window.location.hash.substring(1);
    if (hash && props.items.some((item) => item.id === hash)) {
      selectItem(hash);
    }
  }
});

// Clean up event listeners
onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", checkMobile);
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
  selectItem,
  visibleItems
});
</script>

<style lang="scss" scoped>
.carousel-layout {
  margin: 0 auto;
  padding: map.get($spacing, "xl");
  position: relative;
  overflow: hidden; /* Changed from visible to hidden to prevent overflow */
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
  margin-bottom: map.get($spacing, "xl");
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

  // Add pseudo-elements for the fade effect
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    z-index: 2;
    pointer-events: none; // Allow clicks to pass through
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
    overflow: hidden; /* Changed from visible to hidden */
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
    max-width: none;
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
      max-width: none;

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
      width: 60px; // Slightly smaller fade for minimal mode

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
  position: relative;
  padding: 0;
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
    padding: 0;

    @media (max-width: map.get($breakpoints, "sm")) {
      border-radius: map.get($border-radius, "md");
    }
  }

  :deep(.swiper-pagination) {
    position: relative; /* Change to relative positioning */
    margin-top: 20px; /* Add margin to separate from content */
    bottom: auto;

    @media (max-width: map.get($breakpoints, "sm")) {
      margin-top: 15px;
    }

    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: var(--color-bg-secondary);
      opacity: 0.7;
      transition: all 0.3s ease;
      margin: 0 5px;

      @media (max-width: map.get($breakpoints, "sm")) {
        width: 8px;
        height: 8px;
        margin: 0 4px;
      }

      &-active {
        background-color: var(--color-accent);
        opacity: 1;
        width: 12px;
        height: 12px;

        @media (max-width: map.get($breakpoints, "sm")) {
          width: 10px;
          height: 10px;
        }
      }
    }

    /* Dynamic bullets for mobile */
    &.swiper-pagination-bullets-dynamic {
      .swiper-pagination-bullet {
        transform: scale(0.8);

        &-active {
          transform: scale(1);
        }

        &-active-prev,
        &-active-next {
          transform: scale(0.9);
        }

        &-active-prev-prev,
        &-active-next-next {
          transform: scale(0.7);
        }
      }
    }
  }
}

/* Navigation Controls */
.nav-button {
  display: none; /* Hide navigation buttons */
}

/* Touch-specific optimizations */
@media (hover: none) and (pointer: coarse) {
  .carousel-picker {
    .carousel-item {
      &:hover {
        transform: none; /* Disable hover effects on touch devices */
      }

      :deep(.btn) {
        &:hover {
          box-shadow: none;
        }
      }
    }
  }

  .carousel-content {
    :deep(.swiper-pagination-bullet) {
      width: 12px !important; /* Larger touch targets */
      height: 12px !important;
      margin: 0 6px !important;
    }

    :deep(.swiper-pagination-bullet-active) {
      width: 14px !important;
      height: 14px !important;
    }
  }
}
</style>
