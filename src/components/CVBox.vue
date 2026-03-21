<template>
  <div ref="cvBoxRef">
    <div class="flex justify-between items-center py-6">
      <h2 class="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-text-primary m-0 tracking-tight">CV</h2>
      <div class="flex gap-2 items-center">
        <g-button icon="eye" label="View CV" hide-label border="none" background="transparent" class="!min-w-0" @click="viewCV" />
        <g-button icon="download" label="Download CV" hide-label border="none" background="transparent" class="!min-w-0" @click="downloadCV" />
      </div>
    </div>

    <!-- Only render CV if viewport is wide enough -->
    <div v-if="isWideEnoughForCV" class="bg-bg-secondary rounded-xl p-8 shadow-md">
      <render-c-v :cv="cvData" />
    </div>

    <div class="my-4 mx-auto text-sm text-text-secondary opacity-70 text-center">
      <p class="m-0">
        CV is generated from
        <a href="https://jsonresume.org" target="_blank" rel="noopener" class="underline text-inherit">jsonresume</a>
        compliant <a href="/cv.json" target="_blank" rel="noopener" class="underline text-inherit">JSON</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useResizeObserver } from "@vueuse/core";
import RenderCV from "@/components/RenderCV.vue";
import GButton from "@/components/GButton.vue";
import { cvData } from "@/data/cvData";
import { CVLink } from "@/data/ExternalLinks";

const cvBoxRef = ref<HTMLElement | null>(null);
const isWideEnoughForCV = ref(false);

useResizeObserver(cvBoxRef, (entries) => {
  const { width } = entries[0].contentRect;
  isWideEnoughForCV.value = width > 400;
});

function viewCV() {
  window.open(CVLink, "_blank");
}

function downloadCV() {
  const link = document.createElement("a");
  link.href = CVLink;
  link.download = "cv.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
