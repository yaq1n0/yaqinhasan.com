<template>
  <div ref="cvBoxRef">
    <div class="cv-header">
      <h2>CV</h2>
      <div class="cv-actions">
        <g-button icon="eye" label="View CV" hide-label border="none" background="transparent" class="cv-action-btn" @click="viewCV" />
        <g-button icon="download" label="Download CV" hide-label border="none" background="transparent" class="cv-action-btn" @click="downloadCV" />
      </div>
    </div>

    <!-- Only render CV if viewport is wide enough -->
    <div v-if="isLoaded && cvData && !isTooNarrow" class="cv-wrapper">
      <render-c-v :cv="cvData" />
    </div>
    <div v-else-if="!isLoaded" class="cv-loading">
      <p>Loading CV...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import RenderCV from "@/components/RenderCV.vue";
import GButton from "@/components/GButton.vue";
import { useCVData } from "@/composables/UseCVData";

const { cvData, isLoaded } = useCVData();

const NARROW_THRESHOLD = 400;
const cvBoxRef = ref<HTMLElement | null>(null);
const isTooNarrow = ref(false);

useResizeObserver(cvBoxRef, (entries) => {
  const { width } = entries[0].contentRect;
  isTooNarrow.value = width < NARROW_THRESHOLD;
});

function viewCV() {
  window.open("/cv.pdf", "_blank");
}

function downloadCV() {
  const link = document.createElement("a");
  link.href = "/cv.pdf";
  link.download = "cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style lang="scss" scoped>
.cv-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: map.get($spacing, "lg") 0;

  h2 {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 700;
    color: var(--color-text-primary);
    margin: 0;
    letter-spacing: -0.01em;
  }
}

.cv-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.cv-action-btn {
  min-width: 0 !important;
}

.cv-wrapper {
  background: var(--color-bg-secondary);
  border-radius: map.get($border-radius, "lg");
  padding: map.get($spacing, "xl");
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cv-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--color-text-secondary);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
}
</style>
