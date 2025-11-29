<template>
  <div class="collapsible-section">
    <div class="collapsible-header" :class="{ active: modelValue }" @click="toggleOpen">
      <div class="caret-container">
        <font-awesome-icon :icon="['fas', 'caret-right']" class="caret-icon" :class="{ rotate: modelValue }" />
      </div>
      <h3 class="header-title">
        {{ title }}
      </h3>
    </div>
    <div v-if="modelValue" class="collapsible-content">
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

<style scoped>
.collapsible-section {
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.collapsible-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background-color: var(--color-bg-secondary);
  cursor: pointer;
  user-select: none;
}

.caret-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
  border-radius: 50%;
  padding: 0.5rem;
}

.caret-icon {
  color: var(--color-accent);
}

.caret-icon.rotate {
  transform: rotate(90deg);
}

.header-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.collapsible-content {
  padding: 1rem 1.25rem 1.25rem 1.25rem;
  background-color: var(--color-bg-tertiary);
}

@media (max-width: 768px) {
  .collapsible-header {
    padding: 0.75rem 1rem;
  }

  .collapsible-content {
    padding: 1rem;
  }
}
</style>
