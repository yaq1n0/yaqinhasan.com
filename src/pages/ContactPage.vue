<template>
  <div class="contact-page" :class="{ 'print-mode': isPrintMode }">
    <template v-if="!isPrintMode">
      <section class="page-header">
        <h1>Contact Info & CV</h1>
      </section>

      <div class="contact-container">
        <!-- Contact Container -->
        <div>
          <!-- Contact Box -->
          <contact-box :items="[GitHubIcon, LinkedInIcon, EmailIcon, DownloadCVIcon]" />
        </div>
      </div>
    </template>

    <!-- CV Rendered from JSON -->
    <div v-if="isLoaded && cvData" class="cv-wrapper">
      <render-c-v :cv="cvData" :print-mode="isPrintMode" />
    </div>
    <div v-else class="cv-loading">
      <p>Loading CV...</p>
    </div>

    <!-- Dev mode: link to print preview -->
    <dev-content v-if="!isPrintMode" title="CV Print Preview">
      <g-button label="View print preview" to="/contact?print=true" icon="print" shape="rounded" border="thin" />
    </dev-content>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ContactBox from "@/components/ContactBox.vue";
import DevContent from "@/components/DevContent.vue";
import GButton from "@/components/GButton.vue";
import { GitHubIcon, LinkedInIcon, EmailIcon, DownloadCVIcon } from "@/data/ExternalLinks";
import RenderCV from "@/components/RenderCV.vue";
import { type CV, cvSchema } from "@/data/models/CV";
import { usePrintMode } from "@/composables/UsePrintMode";

const { isPrintMode } = usePrintMode();

// CV data state
const cvData = ref<CV>();
const isLoaded = ref(false);

// Load CV data on mount
onMounted(async () => {
  const cvJson = await import("../data/cv.json"); // ignore the ts warning, it just doesn't treat cv.json as a module but you can import it just fine
  cvData.value = cvSchema.parse(cvJson.default);
  isLoaded.value = true;
});
</script>

<style lang="scss" scoped>
.contact-page {
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

.page-header {
  margin-bottom: map.get($spacing, "base");
  text-align: center;

  h1 {
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin-bottom: map.get($spacing, "sm");
  }
}

.contact-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: map.get($spacing, "xl");
  margin-bottom: map.get($spacing, "xl");

  @media (max-width: map.get($breakpoints, "md")) {
    gap: map.get($spacing, "lg");
  }
}

.info-box {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  padding: map.get($spacing, "lg");
  border: 1px solid var(--color-border);
  max-width: 500px;

  p {
    margin: 0;
    line-height: 1.6;
  }
}

.divider {
  height: 1px;
  background-color: var(--color-border);
  margin: map.get($spacing, "xl") 0;
}

.download-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map.get($spacing, "lg");
  margin-bottom: map.get($spacing, "xl");
  padding: map.get($spacing, "md");
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
.contact-page.print-mode {
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
  .contact-page {
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
