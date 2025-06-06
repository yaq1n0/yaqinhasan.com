<template>
  <div class="debug-carousel-page">
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
        <div v-show="activeItem.id === 'item1'" class="carousel-content">
          <h2>Basic Content</h2>
          <p>This is a basic content slide demonstrating text in the carousel.</p>
          <ul>
            <li>Simple list item 1</li>
            <li>Simple list item 2</li>
            <li>Simple list item 3</li>
          </ul>
        </div>

        <!-- Item 2 -->
        <div v-show="activeItem.id === 'item2'" class="carousel-content">
          <h2>Rich Content</h2>
          <p>This slide demonstrates rich content with buttons and links.</p>
          <div class="button-row">
            <button class="demo-button">Demo Button</button>
            <a href="#" class="demo-link">Demo Link</a>
          </div>
        </div>

        <!-- Item 3 -->
        <div v-show="activeItem.id === 'item3'" class="carousel-content">
          <h2>Media Content</h2>
          <p>This slide demonstrates media content.</p>
          <img src="https://via.placeholder.com/600x300" alt="Placeholder" class="demo-image" />
        </div>

        <!-- Item 4 -->
        <div v-show="activeItem.id === 'item4'" class="carousel-content">
          <h2>Layout Example</h2>
          <div class="two-columns">
            <div class="column">
              <h3>Column 1</h3>
              <p>This is the first column of content.</p>
            </div>
            <div class="column">
              <h3>Column 2</h3>
              <p>This is the second column of content.</p>
            </div>
          </div>
        </div>

        <!-- Item 5 -->
        <div v-show="activeItem.id === 'item5'" class="carousel-content">
          <h2>Card Example</h2>
          <div class="demo-card">
            <h3>Card Title</h3>
            <p>This is a card element within the carousel slide.</p>
          </div>
        </div>
      </template>
    </carousel-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CarouselLayout from "@/components/carousel/CarouselLayout.vue";
import { CarouselItem } from "@/components/carousel/types";

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

<style lang="scss" scoped>
.debug-carousel-page {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-accent);

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
}

.carousel-content {
  padding: 2.5rem;
  background-color: var(--color-bg-secondary);
  border-radius: 0.5rem;
  min-height: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem; /* Add bottom margin to prevent overlap with pagination */
  position: relative; /* Ensure proper positioning context */
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.75rem;
    min-height: 250px;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    min-height: 200px;
    margin-bottom: 1rem;
    border-radius: 0.375rem;
  }

  h2 {
    margin-top: 0;
    color: var(--color-accent);
    margin-bottom: 1.25rem;
    font-size: 1.75rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
  }

  h3 {
    color: var(--color-accent-light);
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;

    @media (max-width: 768px) {
      font-size: 1.125rem;
      margin-top: 1.25rem;
      margin-bottom: 0.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
      margin-top: 1rem;
    }
  }

  p {
    margin-bottom: 1.25rem;
    line-height: 1.6;
    font-size: 1rem;
    color: var(--color-text);

    @media (max-width: 768px) {
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    @media (max-width: 480px) {
      margin-bottom: 0.75rem;
      font-size: 0.9375rem;
      line-height: 1.4;
    }
  }

  ul {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;

    @media (max-width: 768px) {
      margin-bottom: 1rem;
      padding-left: 1.25rem;
    }

    @media (max-width: 480px) {
      margin-bottom: 0.75rem;
      padding-left: 1rem;
    }

    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;

      @media (max-width: 480px) {
        margin-bottom: 0.375rem;
        line-height: 1.4;
        font-size: 0.9375rem;
      }
    }
  }
}

.button-row {
  display: flex;
  gap: 1.25rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    margin: 1.25rem 0;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin: 1rem 0;
  }
}

.demo-button {
  padding: 0.625rem 1.25rem;
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9375rem;
  }

  @media (max-width: 480px) {
    padding: 0.4375rem 0.875rem;
    font-size: 0.875rem;
    border-radius: 0.1875rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.95);
  }
}

.demo-link {
  padding: 0.625rem 1.25rem;
  color: var(--color-accent);
  text-decoration: underline;
  font-weight: 500;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9375rem;
  }

  @media (max-width: 480px) {
    padding: 0.4375rem 0.875rem;
    font-size: 0.875rem;
  }

  &:hover {
    color: var(--color-accent-light);
  }
}

.demo-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: block;
  margin: 1.5rem auto;

  @media (max-width: 768px) {
    margin: 1.25rem auto;
    border-radius: 0.375rem;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    margin: 1rem auto;
    border-radius: 0.25rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
}

.two-columns {
  display: flex;
  gap: 2.5rem;
  margin: 1.5rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    margin: 1.25rem 0;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    margin: 1rem 0;
  }

  .column {
    flex: 1;

    h3 {
      margin-top: 0;
    }
  }
}

.demo-card {
  background-color: var(--color-bg-primary);
  padding: 1.75rem;
  border-radius: 0.75rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  margin: 1.5rem 0;
  border: 1px solid var(--color-border);

  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 0.625rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
    margin: 1.25rem 0;
  }

  @media (max-width: 480px) {
    padding: 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: var(--color-accent);

    @media (max-width: 480px) {
      margin-bottom: 0.5rem;
    }
  }

  p {
    margin-bottom: 0;
  }
}

/* Touch-specific optimizations */
@media (hover: none) and (pointer: coarse) {
  .demo-button {
    &:hover {
      transform: none;
      box-shadow: none;
      filter: none;
    }

    &:active {
      background-color: var(--color-accent-dark, var(--color-accent));
    }
  }

  .demo-link {
    &:hover {
      color: var(--color-accent);
    }

    &:active {
      color: var(--color-accent-light);
    }
  }
}
</style>
