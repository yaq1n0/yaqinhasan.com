<template>
  <div class="home">
    <!-- For Employers Section -->
    <section class="employers-section">
      <div class="section-header">▼ For Employers!</div>
      <p class="section-text">
        If you got here from a job application I made, here are some things you
        might be looking for.
      </p>
      <div class="button-group">
        <button class="list-button">Skills List</button>
        <button class="list-button">Modules List</button>
        <button class="list-button">Projects List</button>
        <button class="list-button">Interests List</button>
      </div>
      <div class="social-links">
        <a
          href="https://github.com/YourGithub"
          target="_blank"
          class="social-link"
        >
          <img src="@/assets/github.svg" alt="GitHub" />
          <span>GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/YourLinkedIn"
          target="_blank"
          class="social-link"
        >
          <img src="@/assets/linkedin.svg" alt="LinkedIn" />
          <span>LinkedIn</span>
        </a>
        <a href="mailto:your.email@example.com" class="social-link">
          <img src="@/assets/email.svg" alt="Email" />
          <span>Email</span>
        </a>
        <a href="/cv" class="social-link">
          <img src="@/assets/cv.svg" alt="CV" />
          <span>CV</span>
        </a>
      </div>
    </section>

    <!-- Main Logo Section -->
    <section class="logo-section">
      <div class="logo">
        <div class="flame-icon">🔥</div>
        <h1 class="name">YAQIN</h1>
      </div>
      <h2 class="tagline">Yet another developer portfolio site :D</h2>
    </section>

    <!-- Bio Section -->
    <section class="bio-section">
      <p class="bio-text">
        Computer Science graduate from the University of Southampton, passionate
        about creating elegant solutions to complex problems. Currently
        developing Kinabase at Cambridge Kinetics.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style lang="scss" scoped>
.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.employers-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: center;

  .section-header {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .button-group {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
  }

  .list-button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    padding: 0.5rem 1rem;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .social-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    transition: transform 0.3s;

    img {
      width: 32px;
      height: 32px;
      margin-bottom: 0.5rem;
    }

    &:hover {
      transform: translateY(-2px);
    }
  }
}

.logo-section {
  text-align: center;
  margin: 4rem 0;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;

    .flame-icon {
      font-size: 3rem;
      margin-right: 1rem;
    }

    .name {
      font-size: 4rem;
      background: linear-gradient(45deg, #4fd1c5, #63b3ed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
    }
  }

  .tagline {
    font-size: 2rem;
    color: #9f7aea;
    margin: 0;
  }
}

.bio-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  .bio-text {
    font-size: 1.1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
