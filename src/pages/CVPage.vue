<template>
  <div class="cv-page" :class="{ 'print-mode': isPrintMode }">
    <!-- Normal mode: use CVBox -->
    <template v-if="!isPrintMode">
      <c-v-box />

      <!-- Dev mode: show the link to the print preview for debugging rendering issues -->
      <dev-content title="CV Print Preview">
        <g-button label="View print preview" to="/cv?print=true" icon="print" shape="rounded" border="thin" />
      </dev-content>
    </template>

    <!-- Print mode: render CV directly -->
    <template v-else>
      <div v-if="isLoaded && cvData" class="cv-wrapper">
        <render-c-v :cv="cvData" />
      </div>
      <div v-else class="cv-loading">
        <p>Loading CV...</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import DevContent from "@/components/DevContent.vue";
import GButton from "@/components/GButton.vue";
import RenderCV from "@/components/RenderCV.vue";
import CVBox from "@/components/CVBox.vue";
import { usePrintMode } from "@/composables/UsePrintMode";
import { useCVData } from "@/composables/UseCVData";

const { isPrintMode } = usePrintMode();
const { cvData, isLoaded } = useCVData();
</script>

<style lang="scss" scoped>
.cv-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: map.get($spacing, "xl");

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }
}

.cv-wrapper {
  background: var(--color-bg-secondary);
  border-radius: map.get($border-radius, "lg");
  padding: map.get($spacing, "lg");
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "sm");
    border-radius: 0;
  }
}

.cv-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--color-text-secondary);
}

// Print mode styles
.cv-page.print-mode {
  padding: 0;
  max-width: none;
  background: white;

  .cv-wrapper {
    background: white;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    border: none;
  }
}

@media print {
  .cv-page {
    padding: 0;
    max-width: none;
    background: white;

    .cv-wrapper {
      background: white;
      border-radius: 0;
      padding: 0;
      box-shadow: none;
      border: none;
    }
  }
}
</style>
