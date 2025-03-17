<template>
  <div class="home">
    <!-- For Employers Section -->
    <EmployersSection />

    <!-- Welcome Section -->
    <div class="welcome">
      <div class="logo">
        <img
          src="/logo-no-background.svg"
          alt="Yaqin Hasan Logo"
        >
      </div>
      <p class="text">
        Yet
        <br>another <br>developer <br>portfolio <br>site :D
      </p>
    </div>

    <p class="top-paragraph">
      Computer Science graduate from the University of Southampton, passionate
      about creating elegant solutions to complex problems. Currently developing
      Kinabase at Cambridge Kinetics.
    </p>

    <!-- "For Developers" section - Only visible in dev mode -->
    <CollapsibleSection
      v-model="devModeOpen"
      title="for_developers"
      class="show-dev-only"
    >
      <p
        class="top-paragraph"
        style="font-weight: 600"
      >
        I see you like to hit random toggles..
      </p>

      <p class="top-paragraph">
        You have enabled "developer mode" on this site, which basically means
        that you have access to more content than is shown by default. You can
        turn this off by hitting that toggle button again. Additional content
        will be in the vivid purple you can see here.
      </p>

      <p class="top-paragraph">
        I added this feature because I wanted the site to be trimmed down for a
        general audience by default, but also be technically comprehensive for
        those who can appreciate it.
      </p>
    </CollapsibleSection>
  </div>
</template>

<script setup lang="ts">
import EmployersSection from '@/components/EmployersSection.vue';
import CollapsibleSection from '@/components/CollapsibleSection.vue';
import { ref } from 'vue';

const devModeOpen = ref(true);
</script>

<style lang="scss" scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: map.get($spacing, "base");
}

/* Text styles */
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

/* Display utilities */
.show-dev-only {
  display: none;
  
  &.active {
    display: block;
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
</style>
