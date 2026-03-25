<template>
  <div class="max-w-[1200px] w-full mx-auto p-8 box-border overflow-x-hidden max-md:px-3 max-md:py-6 max-sm:px-2 max-sm:py-4">
    <carousel-layout
      ref="carouselRef"
      title="Swiper Carousel Demo"
      :items="carouselItems"
      :initial-item-id="activeItemId"
      :auto-scroll="true"
      :pause-on-hover="true"
    >
      <template #default="{ activeItem }">
        <!-- Item 1 -->
        <div
          v-show="activeItem.id === 'item1'"
          class="p-10 bg-bg-secondary rounded-lg min-h-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-6 w-full box-border relative max-md:p-7 max-md:min-h-[250px] max-md:mb-5 max-sm:p-5 max-sm:min-h-[200px] max-sm:mb-4 max-sm:rounded-md"
        >
          <h2 class="mt-0 text-accent mb-5 text-[1.75rem] font-semibold max-md:text-2xl max-md:mb-4 max-sm:text-xl max-sm:mb-3">Basic Content</h2>
          <p class="mb-5 leading-relaxed text-base text-text-primary max-md:mb-4 max-md:leading-snug max-sm:mb-3 max-sm:text-[0.9375rem] max-sm:leading-tight">
            This is a basic content slide demonstrating text in the carousel.
          </p>
          <ul class="mb-5 pl-6 max-md:mb-4 max-md:pl-5 max-sm:mb-3 max-sm:pl-4">
            <li class="mb-2 leading-normal max-sm:mb-1.5 max-sm:leading-tight max-sm:text-[0.9375rem]">Simple list item 1</li>
            <li class="mb-2 leading-normal max-sm:mb-1.5 max-sm:leading-tight max-sm:text-[0.9375rem]">Simple list item 2</li>
            <li class="mb-2 leading-normal max-sm:mb-1.5 max-sm:leading-tight max-sm:text-[0.9375rem]">Simple list item 3</li>
          </ul>
        </div>

        <!-- Item 2 -->
        <div
          v-show="activeItem.id === 'item2'"
          class="p-10 bg-bg-secondary rounded-lg min-h-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-6 w-full box-border relative max-md:p-7 max-md:min-h-[250px] max-md:mb-5 max-sm:p-5 max-sm:min-h-[200px] max-sm:mb-4 max-sm:rounded-md"
        >
          <h2 class="mt-0 text-accent mb-5 text-[1.75rem] font-semibold max-md:text-2xl max-md:mb-4 max-sm:text-xl max-sm:mb-3">Rich Content</h2>
          <p class="mb-5 leading-relaxed text-base text-text-primary max-md:mb-4 max-md:leading-snug max-sm:mb-3 max-sm:text-[0.9375rem] max-sm:leading-tight">
            This slide demonstrates rich content with buttons and links.
          </p>
          <div class="flex gap-5 my-6 flex-wrap max-md:gap-4 max-md:my-5 max-sm:gap-3 max-sm:my-4">
            <button
              class="py-2.5 px-5 bg-accent text-white border-none rounded cursor-pointer font-medium max-md:py-2 max-md:px-4 max-md:text-[0.9375rem] max-sm:py-[0.4375rem] max-sm:px-[0.875rem] max-sm:text-sm max-sm:rounded-[0.1875rem]"
            >
              Demo Button
            </button>
            <a
              href="#"
              class="py-2.5 px-5 text-accent underline font-medium hover:text-accent-light max-md:py-2 max-md:px-4 max-md:text-[0.9375rem] max-sm:py-[0.4375rem] max-sm:px-[0.875rem] max-sm:text-sm"
              >Demo Link</a
            >
          </div>
        </div>

        <!-- Item 3 -->
        <div
          v-show="activeItem.id === 'item3'"
          class="p-10 bg-bg-secondary rounded-lg min-h-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-6 w-full box-border relative max-md:p-7 max-md:min-h-[250px] max-md:mb-5 max-sm:p-5 max-sm:min-h-[200px] max-sm:mb-4 max-sm:rounded-md"
        >
          <h2 class="mt-0 text-accent mb-5 text-[1.75rem] font-semibold max-md:text-2xl max-md:mb-4 max-sm:text-xl max-sm:mb-3">Media Content</h2>
          <p class="mb-5 leading-relaxed text-base text-text-primary max-md:mb-4 max-md:leading-snug max-sm:mb-3 max-sm:text-[0.9375rem] max-sm:leading-tight">
            This slide demonstrates media content.
          </p>
          <img
            src="https://via.placeholder.com/600x300"
            alt="Placeholder"
            class="max-w-full h-auto rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] block my-6 mx-auto max-md:my-5 max-md:rounded-md max-md:shadow-md max-sm:my-4 max-sm:rounded max-sm:shadow-sm"
          />
        </div>

        <!-- Item 4 -->
        <div
          v-show="activeItem.id === 'item4'"
          class="p-10 bg-bg-secondary rounded-lg min-h-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-6 w-full box-border relative max-md:p-7 max-md:min-h-[250px] max-md:mb-5 max-sm:p-5 max-sm:min-h-[200px] max-sm:mb-4 max-sm:rounded-md"
        >
          <h2 class="mt-0 text-accent mb-5 text-[1.75rem] font-semibold max-md:text-2xl max-md:mb-4 max-sm:text-xl max-sm:mb-3">Layout Example</h2>
          <div class="flex gap-10 my-6 max-md:flex-col max-md:gap-6 max-md:my-5 max-sm:gap-4 max-sm:my-4">
            <div class="flex-1">
              <h3 class="mt-0 text-accent-light mb-3 text-xl max-md:text-lg max-md:mb-2 max-sm:text-base">Column 1</h3>
              <p
                class="mb-5 leading-relaxed text-base text-text-primary max-md:mb-4 max-md:leading-snug max-sm:mb-3 max-sm:text-[0.9375rem] max-sm:leading-tight"
              >
                This is the first column of content.
              </p>
            </div>
            <div class="flex-1">
              <h3 class="mt-0 text-accent-light mb-3 text-xl max-md:text-lg max-md:mb-2 max-sm:text-base">Column 2</h3>
              <p
                class="mb-5 leading-relaxed text-base text-text-primary max-md:mb-4 max-md:leading-snug max-sm:mb-3 max-sm:text-[0.9375rem] max-sm:leading-tight"
              >
                This is the second column of content.
              </p>
            </div>
          </div>
        </div>

        <!-- Item 5 -->
        <div
          v-show="activeItem.id === 'item5'"
          class="p-10 bg-bg-secondary rounded-lg min-h-[300px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] mb-6 w-full box-border relative max-md:p-7 max-md:min-h-[250px] max-md:mb-5 max-sm:p-5 max-sm:min-h-[200px] max-sm:mb-4 max-sm:rounded-md"
        >
          <h2 class="mt-0 text-accent mb-5 text-[1.75rem] font-semibold max-md:text-2xl max-md:mb-4 max-sm:text-xl max-sm:mb-3">Card Example</h2>
          <div
            class="bg-bg-primary p-7 rounded-xl shadow-[0_6px_12px_rgba(0,0,0,0.15)] my-6 border border-border max-md:p-6 max-md:rounded-[0.625rem] max-md:shadow-md max-md:my-5 max-sm:p-5 max-sm:rounded-lg max-sm:shadow max-sm:my-4"
          >
            <h3 class="mt-0 mb-3 text-accent text-xl max-md:text-lg max-md:mb-2 max-sm:text-base max-sm:mb-2">Card Title</h3>
            <p class="mb-0 leading-relaxed text-base text-text-primary max-md:leading-snug max-sm:text-[0.9375rem] max-sm:leading-tight">
              This is a card element within the carousel slide.
            </p>
          </div>
        </div>
      </template>
    </carousel-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CarouselLayout from "@/components/carousel/CarouselLayout.vue";
import { CarouselItem } from "@/data/models/CarouselItem";

// Simple state
const activeItemId = ref("item1");
const carouselRef = ref<InstanceType<typeof CarouselLayout> | null>(null);

// Test items for the carousel
const carouselItems: CarouselItem[] = [
  { id: "item1", label: "Basic Content" },
  { id: "item2", label: "Rich Content" },
  { id: "item3", label: "Media Content" },
  { id: "item4", label: "Layout Example" },
  { id: "item5", label: "Card Example" }
];
</script>
