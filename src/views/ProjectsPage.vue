<template>
  <div class="projects">
    <section class="content-section">
      <h1>My Projects</h1>
      <div class="projects-grid">
        <div class="project-card">
          <h3>Project 1</h3>
          <p>
            A brief description of your first featured project. What
            technologies did you use? What problems did it solve?
          </p>
          <div class="tech-stack">
            <span class="tech-tag">Vue.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">SCSS</span>
          </div>
        </div>
        <div class="project-card">
          <h3>Project 2</h3>
          <p>
            Description of another significant project. What was your role? What
            were the key achievements?
          </p>
          <div class="tech-stack">
            <span class="tech-tag">React</span>
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">MongoDB</span>
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

.projects {
  min-height: 100vh;
  background-color: #13141f;
  color: #ffffff;
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(45deg, #4fd1c5, #63b3ed);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 2rem;
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #63b3ed;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
    line-height: 1.6;
  }
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tech-tag {
    background: rgba(79, 209, 197, 0.1);
    color: #4fd1c5;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.9rem;
  }
}
</style>
