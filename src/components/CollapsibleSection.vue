<template>
  <details 
    class="rounded-lg my-4 mx-0 py-4 px-6" 
    :open="modelValue"
    :style="{ 
      backgroundColor: backgroundColorStyle,
      '--header-bg-color': backgroundColorStyle
    }"
  >
    <summary class="bg-[var(--header-bg-color)] p-4 -mx-6 -mt-4 mb-4 rounded-t-lg text-xl font-semibold cursor-pointer list-none text-left" @click.prevent="toggleOpen">
      <div class="flex items-center gap-2">
        <span class="inline-flex transition-transform duration-300 ease-in-out text-primary w-5 h-5 justify-center items-center" :class="{ 'rotate-90': modelValue }">
          <fa-icon :icon="['fas', 'caret-right']" size="lg" />
        </span>
        <span class="flex items-center gap-1">
          <slot name="title">{{ title }}</slot>
        </span>
      </div>
    </summary>
    <div class="pt-4 animate-fadeIn">
      <slot></slot>
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type ColorVariant, type ColorIntensity, getBackgroundColorVar } from '@/types/colors';

interface Props {
  title: string;
  backgroundColor?: ColorVariant;
  colorIntensity?: ColorIntensity;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'background',
  colorIntensity: 'dark'
});

const modelValue = defineModel<boolean>({ required: true });

const toggleOpen = () => modelValue.value = !modelValue.value;

const backgroundColorStyle = computed(() => {
  return getBackgroundColorVar(props.backgroundColor, props.colorIntensity);
});
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in;
}

@media (max-width: 768px) {
  details {
    padding: 1rem;
  }
  
  details summary {
    margin: -1rem -1rem 0.5rem -1rem;
    padding: 0.5rem 1rem;
  }
}
</style> 