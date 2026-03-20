<template>
  <div class="my-6 rounded-lg overflow-hidden shadow-sm">
    <div class="flex items-center px-5 py-3 bg-bg-secondary cursor-pointer select-none max-md:px-4" :class="{ active: modelValue }" @click="toggleOpen">
      <div class="flex items-center justify-center w-8 h-8 mr-4 rounded-full p-2">
        <font-awesome-icon :icon="['fas', 'caret-right']" class="text-accent transition-transform duration-200" :class="{ 'rotate-90': modelValue }" />
      </div>
      <h3 class="text-xl font-semibold m-0">
        {{ title }}
      </h3>
    </div>
    <div v-if="modelValue" class="p-4 pt-4 pb-5 px-5 bg-bg-tertiary max-md:p-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();

const modelValue = defineModel<boolean>({ required: true });

const toggleOpen = () => {
  modelValue.value = !modelValue.value;
};
</script>
