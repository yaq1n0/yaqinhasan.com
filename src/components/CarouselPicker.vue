<template>
  <div 
    class="carousel-picker" 
    :class="{ 
      'single-group': groups.length === 1,
      'minimal': minimal
    }"
  >
    <div class="groups">
      <div 
        v-for="(group, groupIndex) in groups" 
        :key="groupIndex" 
        class="group"
      >
        <h3 v-if="!minimal && showGroupTitles" class="title">{{ group.title }}</h3>
        <div class="links">
          <Button
            v-for="item in group.items"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue';

interface CarouselItem {
  id: string;
  label: string;
}

interface CarouselGroup {
  title: string;
  items: CarouselItem[];
}

defineProps<{
  groups: CarouselGroup[];
  /**
   * When true, group titles will be shown (default)
   */
  showGroupTitles?: boolean;
  /**
   * When true, the component will use a minimal style without borders, backgrounds, etc.
   * Useful when embedded in other components that already provide structure
   */
  minimal?: boolean;
}>();

const modelValue = defineModel<string>({ required: true });

const selectItem = (itemId: string) => {
  modelValue.value = itemId;
};
</script>

<style lang="scss" scoped>
.carousel-picker {
  width: 100%;
}

.groups {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: map.get($spacing, "lg");
  margin-top: map.get($spacing, "md");

  .group {
    flex: 1;
    min-width: 250px;
    background-color: var(--color-bg-secondary);
    border-radius: map.get($border-radius, "lg");
    overflow: hidden;
    border: 1px solid var(--color-border);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    .title {
      background-color: var(--color-accent-translucent);
      padding: map.get($spacing, "md");
      margin: 0;
      font-size: map.get($font-sizes, "lg");
      color: var(--color-accent);
      text-align: center;
      border-bottom: 1px solid var(--color-border);
      letter-spacing: 0.02em;
      font-weight: 600;
    }

    .links {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      padding: map.get($spacing, "md");
      gap: map.get($spacing, "md");
      
      :deep(.btn) {
        min-width: 180px;
        max-width: 250px;
        flex-grow: 1;
        text-align: center;
        margin: map.get($spacing, "xs");
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        &.active-item {
          font-weight: 600;
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          border-color: var(--color-accent);
        }
      }
    }
  }
}

// Special case for single group
.carousel-picker.single-group {
  .groups {
    margin-top: 0;
    
    .group {
      width: 100%;
      max-width: 100%;
      
      .links {
        :deep(.btn) {
          min-width: 140px;
          max-width: 200px;
        }
      }
    }
  }
}

// Minimal style for when embedded in other components
.carousel-picker.minimal {
  .groups {
    margin-top: 0;
    gap: map.get($spacing, "md");
    
    .group {
      background-color: transparent;
      border: none;
      box-shadow: none;
      
      &:hover {
        transform: none;
        box-shadow: none;
      }
      
      .links {
        padding: map.get($spacing, "sm") 0;
        justify-content: flex-start;
        
        :deep(.btn) {
          min-width: 140px;
          margin: map.get($spacing, "xs") map.get($spacing, "xs") map.get($spacing, "xs") 0;
          
          &.active-item {
            border-width: 2px;
          }
        }
      }
    }
  }
  
  &.single-group .groups .group .links {
    justify-content: center;
  }
}

@media (max-width: map.get($breakpoints, "md")) {
  .groups {
    .group {
      .links {
        :deep(.btn) {
          min-width: 160px;
        }
      }
    }
  }
  
  .carousel-picker.minimal .groups .group .links {
    :deep(.btn) {
      min-width: 130px;
    }
  }
}

@media (max-width: map.get($breakpoints, "sm")) {
  .groups {
    flex-direction: column;
    
    .group {
      width: 100%;
      
      .links {
        flex-direction: row;
        
        :deep(.btn) {
          min-width: 140px;
        }
      }
    }
  }
  
  .carousel-picker.minimal .groups .group .links {
    justify-content: center;
    
    :deep(.btn) {
      min-width: 120px;
      margin: map.get($spacing, "xs");
    }
  }
}
</style> 