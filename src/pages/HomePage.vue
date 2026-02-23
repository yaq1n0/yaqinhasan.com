<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <div class="hero-header">
            <div class="hero-title-wrapper">
              <h1 class="hero-title">
                <span class="title-main">Software Engineer</span>
                <span class="title-sub">Full-Stack • BSc Computer Science</span>
              </h1>
            </div>
            <div class="hero-visual">
              <img src="/logo-no-background.svg" alt="Yaqin Hasan" class="hero-logo" />
            </div>
          </div>

          <ul class="hero-bullets">
            <li>Ship things that solve real-world problems</li>
            <li>Scope → Design → Build → Deploy → Support</li>
            <li class="mobile-hide">Pull Requests on weekdays and Personal Records on weekends</li>
          </ul>

          <p class="visa-line">Based in Cambridge, UK • Skilled Worker Sponsorship Required</p>
        </div>
      </div>
    </section>

    <hr class="section-divider" />

    <!-- CV Section -->
    <section class="cv-section">
      <c-v-box />
    </section>
  </div>
</template>

<script setup lang="ts">
import CVBox from "@/components/CVBox.vue";
</script>

<style lang="scss" scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
}

/* Hero Section */
.hero {
  padding: clamp(3rem, 8vw, 6rem) map.get($spacing, "xl") clamp(2rem, 5vw, 4rem);
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "2xl") map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "xl") map.get($spacing, "md") map.get($spacing, "lg");
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.hero-header {
  display: flex;
  align-items: center;
  gap: map.get($spacing, "xl");

  @media (max-width: map.get($breakpoints, "sm")) {
    gap: map.get($spacing, "md");
    margin-bottom: map.get($spacing, "md");
  }
}

.hero-visual {
  flex-shrink: 0;

  .hero-logo {
    width: clamp(60px, 10vw, 100px);
    height: auto;
    display: block;

    @media (max-width: map.get($breakpoints, "sm")) {
      width: clamp(50px, 12vw, 70px);
    }
  }
}

.hero-title-wrapper {
  flex: 1;
}

.hero-title {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.5rem);

  .title-main {
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 800;
    color: var(--color-text-primary);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .title-sub {
    font-size: clamp(0.875rem, 2vw, 1.25rem);
    font-weight: 400;
    color: var(--color-accent);
    line-height: 1.5;
    margin-top: 0.25rem;
  }
}

.hero-bullets {
  list-style: disc;
  padding-left: 1rem;
  margin: clamp(1rem, 2vw, 1.5rem) 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.875rem, 2vw, 1.25rem);
  font-size: clamp(0.9375rem, 1.5vw, 1.125rem);
  line-height: 1.7;

  li {
    &.mobile-hide {
      @media (max-width: map.get($breakpoints, "sm")) {
        display: none; // Hide third bullet on mobile
      }
    }
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    gap: clamp(0.75rem, 1.5vw, 1rem);
  }
}

.visa-line {
  margin-top: clamp(1rem, 2vw, 1.5rem);
  font-size: clamp(0.8125rem, 1.25vw, 0.9375rem);
  color: var(--color-text-secondary);
  font-style: italic;
  line-height: 1.5;

  @media (max-width: map.get($breakpoints, "sm")) {
    margin-top: map.get($spacing, "md");
  }
}

.section-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0 map.get($spacing, "lg");
}

/* CV Section */
.cv-section {
  margin: 0 auto;
  padding: 0 map.get($spacing, "xl");
  max-width: 1200px;
}
</style>
