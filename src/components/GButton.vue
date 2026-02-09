<template>
  <component
    :is="isRouterLink ? 'router-link' : 'button'"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :title="label"
    :class="['btn', `shape-${shape}`, `border-${border}`, `label-${labelPos}`, { 'has-icon': !!icon }]"
    :style="{ '--btn-bg-color': background }"
    @click="$emit('click', $event)"
  >
    <div class="btn-content">
      <font-awesome-icon v-if="parsedIcon" :icon="parsedIcon" class="btn-icon" :class="`icon-${iconSize}`" />

      <span v-if="label && !hideLabel" class="btn-label">{{ label }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ButtonProps } from "../data/models/Button";

const props = withDefaults(defineProps<ButtonProps>(), {
  labelPos: "right",
  icon: "",
  iconPrefix: "fas",
  iconSize: "sm",
  border: "thin",
  shape: "squircle",
  background: "var(--color-accent-translucent)"
});

defineEmits(["click"]);

const isRouterLink = computed(() => !!props.to || !!props.href);

// Parse icon to handle both "fa-icon-name" and "icon-name" formats
const parsedIcon = computed(() => {
  if (!props.icon) return undefined;

  // Strip common FontAwesome prefixes (fa-, fas-, fab-, far-, fal-, fat-, fad-, fass-)
  const iconName = props.icon.replace(/^(fa|fas|fab|far|fal|fat|fad|fass)-/, "");

  return [props.iconPrefix, iconName];
});
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
  border: none;
  outline: none;
  min-width: 120px;
  min-height: 40px;
  max-width: 100%;
  width: auto;

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
  &.border-thin,
  &.border-thick {
    border-color: rgba(255, 255, 255, 0.15);
  }
}
</style>
