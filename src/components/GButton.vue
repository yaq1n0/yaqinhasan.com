<template>
  <component
    :is="isLink ? 'router-link' : 'button'"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :class="[
      'btn',
      `shape-${shape}`,
      `border-${border}`,
      `label-${labelPos}`,
      { 'has-icon': !!icon },
    ]"
    :style="{ '--btn-bg-color': background }"
    @click="$emit('click', $event)"
  >
    <div class="btn-content">
      <font-awesome-icon
        v-if="icon"
        :icon="[iconPrefix, icon]"
        class="btn-icon"
        :class="`icon-${iconSize}`"
      />

      <span
        v-if="label"
        class="btn-label"
      >{{ label }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ButtonProps {
  label: string;
  labelPos?: "left" | "right" | "above" | "below";
  icon?: string;
  iconPrefix?: "fas" | "fab" | "far";
  iconSize?: "sm" | "md" | "lg";
  border?: "thin" | "thick" | "none";
  shape?: "rounded" | "squircle";
  background?: string;
  to?: string | object;
  href?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  labelPos: "right",
  icon: "",
  iconPrefix: "fas",
  iconSize: "sm",
  border: "thin",
  shape: "squircle",
  background: "var(--color-accent-translucent)",
  to: "",
  href: "",
});

defineEmits(["click"]);

const isLink = computed(() => !!props.to || !!props.href);
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--btn-bg-color, var(--color-accent-translucent));
  color: var(--color-text-primary);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  outline: none;
  min-width: 120px;
  min-height: 40px;
  max-width: 100%;
  width: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
    filter: brightness(0.95);
  }

  .btn-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    justify-content: center;
  }

  &.shape-rounded {
    border-radius: 1rem;
  }

  &.shape-squircle {
    border-radius: 0.5rem;
  }

  &.border-thin {
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  &.border-thick {
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  &.border-none {
    border: none;
  }

  &.label-above,
  &.label-below {
    padding: 0.75rem;

    .btn-content {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  &.label-left,
  &.label-right {
    .btn-content {
      flex-direction: row;
      gap: 0.5rem;
    }
  }

  &.label-above {
    .btn-content {
      flex-direction: column-reverse;
    }
  }

  &.label-left {
    .btn-content {
      flex-direction: row-reverse;
    }
  }

  .btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    &.icon-sm {
      width: 1.2em;
      height: 1.2em;
    }

    &.icon-md {
      width: 1.5em;
      height: 1.5em;
    }

    &.icon-lg {
      width: 2em;
      height: 2em;
    }
  }

  .btn-label {
    font-weight: 500;
    letter-spacing: 0.02em;
    white-space: normal;
    overflow: visible;
    text-overflow: initial;
    max-width: 100%;
    line-height: 1.2;
  }
}

// Dark mode adjustments
:root[data-theme="dark"] .btn {
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &.border-thin,
  &.border-thick {
    border-color: rgba(255, 255, 255, 0.15);
  }
}
</style>
