<template>
  <div class="interests">
    <section class="content-section">
      <h1>My Interests</h1>
      <div class="interests-grid">
        <div class="interest-card">
          <h3>Technical Interests</h3>
          <ul>
            <li>Web Development</li>
            <li>Machine Learning</li>
            <li>System Architecture</li>
            <li>Open Source Software</li>
          </ul>
        </div>
        <div class="interest-card">
          <h3>Hobbies</h3>
          <ul>
            <li>Photography</li>
            <li>Reading</li>
            <li>Hiking</li>
            <li>Gaming</li>
          </ul>
        </div>
        <div class="interest-card">
          <h3>Learning Goals</h3>
          <ul>
            <li>Cloud Architecture</li>
            <li>Mobile Development</li>
            <li>UI/UX Design</li>
            <li>DevOps Practices</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>

<style lang="scss" scoped>

.interests {
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

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.interest-card {
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

  ul {
    list-style: none;
    padding: 0;

    li {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
      position: relative;

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: #4fd1c5;
      }
    }
  }
}
</style>
