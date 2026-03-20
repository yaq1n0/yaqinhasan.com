<template>
  <div class="max-w-[1400px] mx-auto">
    <!-- Hero Section -->
    <section class="hero">
      <div class="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <div class="flex items-center gap-8 max-sm:gap-3 max-sm:mb-3">
          <div class="flex-1">
            <h1 class="m-0 flex flex-col gap-[clamp(0.25rem,1vw,0.5rem)]">
              <span class="text-[clamp(1.75rem,5vw,3rem)] font-extrabold text-text-primary leading-tight tracking-tight">Software Engineer</span>
              <span class="text-[clamp(0.875rem,2vw,1.25rem)] font-normal text-accent leading-relaxed mt-1">Full-Stack • BSc Computer Science</span>
            </h1>
          </div>
          <div class="shrink-0">
            <img src="/logo-no-background.svg" alt="Yaqin Hasan" class="hero-logo w-[clamp(60px,10vw,100px)] max-sm:w-[clamp(50px,12vw,70px)] h-auto block" />
          </div>
        </div>

        <ul class="list-disc pl-4 my-[clamp(1rem,2vw,1.5rem)] flex flex-col gap-[clamp(0.875rem,2vw,1.25rem)] text-[clamp(0.9375rem,1.5vw,1.125rem)] leading-relaxed max-sm:gap-[clamp(0.75rem,1.5vw,1rem)]">
          <li>Ship things that solve real-world problems</li>
          <li>Scope → Design → Build → Deploy → Support</li>
          <li class="max-sm:hidden">Pull Requests on weekdays and Personal Records on weekends</li>
        </ul>

        <p class="mt-[clamp(1rem,2vw,1.5rem)] max-sm:mt-3 text-[clamp(0.8125rem,1.25vw,0.9375rem)] text-text-secondary italic leading-relaxed">Based in Cambridge, UK • Skilled Worker Sponsorship Required</p>
      </div>
    </section>

    <hr class="border-t border-border mx-6" />

    <!-- CV Section -->
    <section class="mx-auto px-8 max-w-[1200px]">
      <c-v-box />
    </section>
  </div>
</template>

<script setup lang="ts">
import CVBox from "@/components/CVBox.vue";
</script>

<style scoped>
.hero {
  padding: clamp(3rem, 8vw, 6rem) 2rem clamp(2rem, 5vw, 4rem);
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .hero {
    padding: 3rem 1.5rem;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: 2rem 0.75rem 1.5rem;
  }
}
</style>
