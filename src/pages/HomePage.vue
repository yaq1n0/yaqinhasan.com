<template>
  <div class="home">
    <!-- For Employers Section (Desktop) -->
    <details class="collapsible show-landscape-only" open>
      <summary class="header">For Employers!</summary>

      <p class="top-paragraph">
        If you got here from a job application I made, here are some things you
        might be looking for.
      </p>

      <div class="text-box">
        <router-link to="/about" class="link">Skills List</router-link>
        <router-link to="/about" class="link">Modules List</router-link>
        <router-link to="/projects" class="link">Projects List</router-link>
        <router-link to="/interests" class="link">Interests List</router-link>
      </div>

      <div class="contact-box">
        <div class="item">
          <a href="https://github.com/yaq1n0" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <span>GitHub</span>
        </div>

        <div class="item">
          <a href="https://www.linkedin.com/in/yaqinhasan" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
          <span>LinkedIn</span>
        </div>

        <div class="item">
          <a href="mailto:yaqin.k.hasan@gmail.com">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </a>
          <span>Email</span>
        </div>

        <div class="item">
          <router-link to="/contact">
            <font-awesome-icon :icon="['fas', 'file-alt']" />
          </router-link>
          <span>CV</span>
        </div>
      </div>
    </details>

    <!-- For Employers Section (Mobile) -->
    <div class="content-box show-portrait-only">
      <p class="top-header">For Employers!</p>

      <p class="top-paragraph">
        If you got here from a job application I made, here are some things you
        might be looking for.
      </p>

      <div class="text-box">
        <router-link to="/about" class="link">Skills List</router-link>
        <router-link to="/about" class="link">Modules List</router-link>
        <router-link to="/projects" class="link">Projects List</router-link>
        <router-link to="/interests" class="link">Interests List</router-link>
      </div>

      <div class="contact-box">
        <div class="item">
          <a href="https://github.com/yaq1n0" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <span>GitHub</span>
        </div>

        <div class="item">
          <a href="https://www.linkedin.com/in/yaqinhasan" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
          </a>
          <span>LinkedIn</span>
        </div>

        <div class="item">
          <a href="mailto:yaqin.k.hasan@gmail.com">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </a>
          <span>Email</span>
        </div>

        <div class="item">
          <router-link to="/contact">
            <font-awesome-icon :icon="['fas', 'file-alt']" />
          </router-link>
          <span>CV</span>
        </div>
      </div>
    </div>

    <!-- Welcome Section -->
    <div class="welcome">
      <div class="logo">
        <img src="/logo-no-background.svg" alt="Yaqin Hasan Logo" />
      </div>
      <p class="text">
        Yet
        <br />another <br />developer <br />portfolio <br />site :D
      </p>
    </div>

    <p class="top-paragraph">
      Computer Science graduate from the University of Southampton, passionate
      about creating elegant solutions to complex problems. Currently developing
      Kinabase at Cambridge Kinetics.
    </p>

    <!-- "For Developers" section - Only visible in dev mode -->
    <div class="content-box show-dev-only">
      <p class="top-header">for_developers</p>

      <p class="top-paragraph" style="font-weight: 600">
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
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this page
</script>

<style lang="scss" scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: map-get($spacing, "base");
}

/* Collapsible section */
.collapsible {
  background-color: var(--color-bg-tertiary);
  border-radius: map-get($border-radius, "lg");
  margin: map-get($spacing, "md") 0;
  padding: map-get($spacing, "lg");

  .header {
    background-color: var(--color-bg-tertiary);
    padding: map-get($spacing, "md");
    margin: -#{map-get($spacing, "lg")} -#{map-get($spacing, "lg")}
      map-get($spacing, "md") -#{map-get($spacing, "lg")};
    border-radius: map-get($border-radius, "lg") map-get($border-radius, "lg") 0
      0;
    font-size: map-get($font-sizes, "xl");
    font-weight: 600;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: "▼";
      margin-right: map-get($spacing, "sm");
    }
  }

  &[open] .header::before {
    content: "▼";
  }

  &:not([open]) .header::before {
    content: "►";
  }
}

/* Content box for mobile */
.content-box {
  background-color: var(--color-bg-tertiary);
  border-radius: map-get($border-radius, "lg");
  margin: map-get($spacing, "md") 0;
  padding: map-get($spacing, "lg");

  &.show-dev-only {
    border: 2px solid var(--color-dev-highlight);
  }
}

/* Text styles */
.top-header {
  text-align: center;
  color: var(--color-accent);
  margin: map-get($spacing, "lg") 0;
  font-size: map-get($font-sizes, "2xl");
}

.top-paragraph {
  line-height: 1.6;
  max-width: 800px;
  margin: map-get($spacing, "lg") auto;
  animation: fadeIn 1s ease-in;
}

/* Text box with links */
.text-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map-get($spacing, "md");
  margin: map-get($spacing, "lg") 0;

  .link {
    background-color: var(--color-accent-translucent);
    padding: map-get($spacing, "sm") map-get($spacing, "md");
    border-radius: map-get($border-radius, "md");
    color: var(--color-text-primary);
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

/* Contact box with social links */
.contact-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map-get($spacing, "lg");
  margin: map-get($spacing, "lg") 0;
  padding: map-get($spacing, "md");
  background-color: var(--color-accent-translucent);
  border-radius: map-get($border-radius, "lg");
  animation: fadeIn 1s ease-in;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: map-get($spacing, "xs");

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 48px;
      height: 48px;
      background-color: var(--color-bg-secondary);
      border-radius: 50%;
      color: var(--color-text-primary);
      text-decoration: none;
      transition: all 0.2s ease;

      svg {
        width: 24px;
        height: 24px;
      }

      &:hover {
        transform: scale(1.1);
        color: var(--color-accent);
      }
    }

    span {
      font-size: map-get($font-sizes, "sm");
    }
  }
}

/* Welcome section with logo */
.welcome {
  display: flex;
  width: 90%;
  margin: map-get($spacing, "xl") auto;
  justify-content: center;
  align-items: center;
  gap: map-get($spacing, "xl");
  animation: slideUp 0.8s ease-out;

  .logo {
    display: flex;
    padding: map-get($spacing, "md");
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
    padding: map-get($spacing, "md");
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
@media (max-width: map-get($breakpoints, "md")) {
  .welcome {
    flex-direction: column;
    gap: map-get($spacing, "md");
    margin: map-get($spacing, "md") auto;

    .logo {
      width: 60%;
    }

    .text {
      text-align: center;
      font-size: clamp(1.5rem, 6vw, 3rem);
    }
  }

  .top-header {
    font-size: map-get($font-sizes, "xl");
  }

  .collapsible,
  .content-box {
    padding: map-get($spacing, "md");
  }

  .collapsible .header {
    margin: -#{map-get($spacing, "md")} -#{map-get($spacing, "md")}
      map-get($spacing, "sm") -#{map-get($spacing, "md")};
    padding: map-get($spacing, "sm") map-get($spacing, "md");
  }
}

/* Display utilities */
.show-landscape-only {
  @media (max-width: map-get($breakpoints, "md")) {
    display: none !important;
  }
}

.show-portrait-only {
  @media (min-width: map-get($breakpoints, "md") + 1px) {
    display: none !important;
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
