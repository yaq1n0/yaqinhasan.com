<template>
  <div class="home">
    <p class="hero-tagline">Full Stack SWE - Somewhat Stacked Dude</p>

    <!-- "For Developers" section - Only visible in dev mode -->
    <collapsible-section v-if="isDevMode" :model-value="true" title="forDevs">
      <p class="top-paragraph" style="font-weight: 600">So you like to hit random toggles?</p>
      <p class="top-paragraph">You have enabled "developer mode" on this site, which shows some extra content than what is shown by default.</p>
    </collapsible-section>

    <!-- "For Employers" section - Only visible in non-dev mode (default)-->
    <collapsible-section v-else :model-value="true" title="For Employers!">
      <contact-box :items="[GitHubIcon, LinkedInIcon, EmailIcon, CVIcon]" />
    </collapsible-section>

    <div class="welcome">
      <div class="logo">
        <img src="/logo-no-background.svg" alt="Yaqin Hasan Logo" />
      </div>
      <p class="text">Yet<br />another<br />dev<br />portfolio<br />site :D</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactBox from "@/components/ContactBox.vue";
import CollapsibleSection from "@/components/CollapsibleSection.vue";
import { useDevMode } from "@/composables/UseDevMode";
import { GitHubIcon, LinkedInIcon, EmailIcon, CVIcon } from "@/data/ExternalLinks";
const { isDevMode } = useDevMode();
</script>

<style lang="scss" scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.collapsible-section {
  margin-left: map.get($spacing, "xl");
  margin-right: map.get($spacing, "xl");
}

/* Text styles */
.hero-tagline {
  text-align: center;
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.4;
  max-width: 900px;
  margin: map.get($spacing, "xl") auto;
  padding: map.get($spacing, "lg");
  color: var(--color-accent-light);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.top-paragraph {
  line-height: 1.6;
  max-width: 800px;
  margin: map.get($spacing, "sm") auto;
}

/* Welcome section with logo */
.welcome {
  display: flex;
  width: 90%;
  margin: map.get($spacing, "xl") auto;
  justify-content: center;
  align-items: center;
  gap: map.get($spacing, "xl");

  .logo {
    display: flex;
    padding: map.get($spacing, "md");
    width: 40%;
    max-width: 40rem;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));

    img {
      width: 100%;
      height: auto;
    }
  }

  .text {
    display: flex;
    padding: map.get($spacing, "md");
    text-align: right;
    font-size: clamp(2rem, 4vw, 4rem);
    font-weight: 800;
    font-family: var(--font-mono);
    color: var(--color-accent-light);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
}

/* Responsive adjustments */
@media (max-width: map.get($breakpoints, "md")) {
  .hero-tagline {
    font-size: clamp(1rem, 4vw, 1.5rem);
    padding: map.get($spacing, "md");
    margin: map.get($spacing, "lg") auto;
  }

  .welcome {
    flex-direction: column;
    gap: map.get($spacing, "md");
    margin: map.get($spacing, "md") auto;

    .logo {
      width: 60%;
    }

    .text {
      text-align: center;
      font-size: clamp(1.5rem, 6vw, 3rem);
    }
  }

  .top-paragraph {
    font-size: map.get($font-sizes, "base");
  }
}
</style>
