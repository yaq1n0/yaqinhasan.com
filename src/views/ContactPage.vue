<template>
  <div class="contact">
    <section class="content-section">
      <h1>Get in Touch</h1>
      <div class="contact-content">
        <div class="contact-info">
          <p>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>

          <div class="contact-methods">
            <a href="mailto:your.email@example.com" class="contact-method">
              <span class="icon">📧</span>
              <span class="text">your.email@example.com</span>
            </a>
            <a
              href="https://github.com/YourGithub"
              target="_blank"
              class="contact-method"
            >
              <span class="icon">🐙</span>
              <span class="text">GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/YourLinkedIn"
              target="_blank"
              class="contact-method"
            >
              <span class="icon">💼</span>
              <span class="text">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style lang="scss" scoped>

.contact {
  min-height: 100vh;
  background-color: #13141f;
  color: #ffffff;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-section {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(45deg, #4fd1c5, #63b3ed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
  }
}

.contact-content {
  .contact-info {
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
    }
  }
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .contact-method {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    text-decoration: none;
    color: #ffffff;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(10px);
      background: rgba(255, 255, 255, 0.1);
    }

    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    .text {
      font-size: 1.1rem;
    }
  }
}
</style>
