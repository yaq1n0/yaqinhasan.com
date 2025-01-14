<template>
  <div class="about">
    <section class="content-section">
      <h1>About Me</h1>
      <div class="bio-content">
        <p>
          Hello! I'm a passionate software developer with a strong foundation in
          computer science from the University of Southampton. I love tackling
          complex problems and turning them into elegant solutions.
        </p>
        <p>
          Currently, I'm working at Cambridge Kinetics, where I'm helping
          develop Kinabase and growing my skills in modern web development.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style lang="scss" scoped>
.about {
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

  .bio-content {
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1.5rem;
    }
  }
}
</style>
