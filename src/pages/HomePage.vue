<template>
  <div class="max-w-[1400px] mx-auto">
    <!-- Hero Section -->
    <section class="pt-5 px-3 pb-4 sm:pt-8 sm:px-6 sm:pb-6 md:pt-[clamp(3rem,8vw,6rem)] md:px-8 md:pb-[clamp(2rem,5vw,3rem)] max-w-[1200px] mx-auto">
      <div class="flex flex-col">
        <div class="flex items-center gap-8 max-sm:gap-3 max-sm:mb-3">
          <div class="flex-1">
            <h1 class="m-0 flex flex-col gap-[clamp(0.25rem,1vw,0.5rem)]">
              <span class="text-[clamp(1.75rem,5vw,3rem)] font-extrabold text-text-primary leading-tight tracking-tight">Software Engineer</span>
              <span class="text-[clamp(0.875rem,2vw,1.25rem)] font-normal text-accent leading-relaxed mt-1">Full Stack · BSc Computer Science</span>
            </h1>
          </div>
          <div class="shrink-0">
            <img src="/logo-no-background.svg" alt="Yaqin Hasan" class="w-[clamp(60px,10vw,100px)] max-sm:w-[clamp(50px,12vw,70px)] h-auto block" />
          </div>
        </div>

        <div class="w-full h-px bg-border my-[clamp(1.25rem,3vw,1.75rem)]" />

        <p class="text-[clamp(0.9375rem,1.5vw,1.125rem)] text-text-primary leading-relaxed">Solve complex problems pragmatically.</p>
        <p class="text-[clamp(0.9375rem,1.5vw,1.125rem)] text-text-secondary leading-relaxed mt-3">Pull Requests on weekdays. Personal Records on weekends.</p>

        <p class="mt-[clamp(1.5rem,3vw,2rem)] text-[clamp(0.8125rem,1.25vw,0.9375rem)] text-text-secondary italic leading-relaxed opacity-70">
          Cambridge, UK · Open to relocation · Visa sponsorship required
        </p>
      </div>

      <!-- Scroll indicator — fades out on scroll, clicks to projects -->
      <button class="scroll-indicator" :class="{ 'opacity-0 pointer-events-none': hasScrolled }" aria-label="Scroll to projects" @click="scrollToProjects">
        <span class="text-[clamp(0.6875rem,1vw,0.8125rem)] tracking-wider uppercase">Projects · CV · Contact</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 7L10 13L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </section>

    <!-- Projects Section -->
    <section
      ref="projectsSection"
      class="max-w-[1200px] mx-auto py-8 px-3 sm:py-[clamp(2.5rem,5vw,4rem)] sm:px-8 fade-section"
      :class="{ visible: visibleSections.projects }"
    >
      <div class="flex items-baseline justify-between mb-[clamp(1rem,2vw,1.5rem)]">
        <h2 class="text-[clamp(1.25rem,3vw,1.5rem)] font-bold text-text-primary">Stuff I'm building</h2>
        <router-link to="/projects" class="text-[clamp(0.75rem,1.25vw,0.875rem)] text-accent no-underline hover:underline">View all projects →</router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <project-card v-for="project in featuredProjects" :key="project.id" :project="project" :simplified="true" />
      </div>
    </section>

    <!-- CV Section -->
    <section
      ref="cvSection"
      class="max-w-[1200px] mx-auto py-8 px-3 sm:py-[clamp(2.5rem,5vw,4rem)] sm:px-8 fade-section"
      :class="{ visible: visibleSections.cv }"
    >
      <div ref="cvBoxRef">
        <div class="flex items-baseline justify-between mb-[clamp(1rem,2vw,1.5rem)]">
          <h2 class="text-[clamp(1.25rem,3vw,1.5rem)] font-bold text-text-primary">My CV</h2>
          <div class="flex gap-2 items-center">
            <g-button icon="eye" label="View CV" hide-label border="none" background="transparent" class="!min-w-0" @click="viewCV" />
            <g-button icon="download" label="Download CV" hide-label border="none" background="transparent" class="!min-w-0" @click="downloadCV" />
          </div>
        </div>

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
    </section>

    <!-- Contact Section -->
    <section
      ref="contactSection"
      class="text-center max-w-[1200px] mx-auto py-8 px-3 sm:py-[clamp(2.5rem,5vw,4rem)] sm:px-8 fade-section"
      :class="{ visible: visibleSections.contact }"
    >
      <h2 class="text-[clamp(1.25rem,3vw,1.625rem)] font-bold text-text-primary mb-3">Let's Talk!</h2>
      <p class="text-[clamp(0.8125rem,1.25vw,0.9375rem)] text-text-secondary mb-7">Looking for my next role · Open to collaboration</p>
      <div class="flex gap-3.5 justify-center flex-wrap">
        <g-button :href="`mailto:${email}`" icon="envelope" icon-prefix="fas" label="Email" />
        <g-button :href="LinkedInLink" icon="linkedin" icon-prefix="fab" label="LinkedIn" />
        <g-button :href="GitHubLink" icon="github" icon-prefix="fab" label="GitHub" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { useResizeObserver } from "@vueuse/core";
import GButton from "@/components/GButton.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import RenderCV from "@/components/RenderCV.vue";
import { fullProjects } from "@/data/projects/projectHelpers";
import { GitHubLink, LinkedInLink, CVLink } from "@/data/ExternalLinks";
import { cvData } from "@/data/cvData";

const email = cvData.basics?.email ?? "";

// CV section
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

const featuredProjectIds = ["opl-py", "prompt-as-endpoint", "CryptIt", "STQL"];
const featuredProjects = featuredProjectIds.map((id) => fullProjects.find((p) => p.id === id)).filter((p) => !!p);

function scrollToProjects() {
  projectsSection.value?.scrollIntoView({ behavior: "smooth" });
}

// Scroll indicator — reappears when user scrolls back to top
const hasScrolled = ref(false);
function onScroll() {
  hasScrolled.value = window.scrollY > 50;
}

// Fade-in on scroll
const projectsSection = ref<HTMLElement>();
const cvSection = ref<HTMLElement>();
const contactSection = ref<HTMLElement>();
const visibleSections = reactive({ projects: false, cv: false, contact: false });

let observer: IntersectionObserver;

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.target === projectsSection.value) visibleSections.projects = true;
          else if (entry.target === cvSection.value) visibleSections.cv = true;
          else if (entry.target === contactSection.value) visibleSections.contact = true;
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  [projectsSection, cvSection, contactSection].forEach((s) => {
    if (s.value) observer.observe(s.value);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  observer?.disconnect();
});
</script>

<style scoped>
/* Scroll indicator — needs all:unset + custom keyframes, can't be pure Tailwind */
.scroll-indicator {
  all: unset;
  cursor: pointer;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--color-text-secondary);
  opacity: 0.4;
  animation: gentle-bounce 2s ease-in-out infinite;
  transition: opacity 0.5s ease;
}

@keyframes gentle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

/* Fade-in sections — class-toggle pattern works best in CSS */
.fade-section {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-section.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-indicator {
    animation: none;
  }

  .fade-section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
