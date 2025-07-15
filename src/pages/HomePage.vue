<template>
  <div class="home">
    <p class="hero-tagline">
      Full Stack Software Engineer - Computer Science Graduate. <br />
      Building Kinabase @ Cambridge Kinetics
    </p>

    <collapsible-section :model-value="true" title="For Employers!" class="for-employers">
      <p class="top-paragraph">If you got here from a job application I made, here are some things you might be looking for.</p>
      <contact-box />
    </collapsible-section>

    <div class="welcome">
      <div class="logo">
        <img src="/logo-no-background.svg" alt="Yaqin Hasan Logo" />
      </div>
      <p class="text">
        Yet
        <br />another <br />developer <br />portfolio <br />site :D
      </p>
    </div>

    <!-- "For Developers" section - Only visible in dev mode -->
    <collapsible-section v-if="isDevMode" :model-value="true" title="for_developers">
      <p class="top-paragraph" style="font-weight: 600">I see you like to hit random toggles..</p>
      <p class="top-paragraph">
        You have enabled "developer mode" on this site, which basically means that you have access to more content than is shown by default. You can turn this
        off by hitting that toggle button again. Additional content will be in the vivid purple you can see here.
      </p>
      <p class="top-paragraph">
        I added this feature because I wanted the site to be trimmed down for a general audience by default, but also be technically comprehensive for those who
        can appreciate it.
      </p>
    </collapsible-section>
  </div>
</template>

<script setup lang="ts">
import ContactBox from "@/components/ContactBox.vue";
import CollapsibleSection from "@/components/CollapsibleSection.vue";

import { useDevMode } from "@/composables/UseDevMode";

const { isDevMode } = useDevMode();
</script>

<style lang="scss" scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.for-employers {
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
  animation: heroFadeIn 1.2s ease-out;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.top-paragraph {
  line-height: 1.6;
  max-width: 800px;
  margin: map.get($spacing, "lg") auto;
  animation: fadeIn 1s ease-in;
}

/* Welcome section with logo */
.welcome {
  display: flex;
  width: 90%;
  margin: map.get($spacing, "xl") auto;
  justify-content: center;
  align-items: center;
  gap: map.get($spacing, "xl");
  animation: slideUp 0.8s ease-out;

  .logo {
    display: flex;
    padding: map.get($spacing, "md");
    width: 40%;
    max-width: 40rem;
    animation: fadeIn 1.2s ease-in;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    transition: transform 0.3s ease;

    img {
      width: 100%;
      height: auto;
    }

    &:hover {
      transform: scale(1.02);
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
    animation: slideIn 0.8s ease-out;
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

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
