<template>
  <div class="technical-page">
    <section class="page-header">
      <h1>site_info</h1>
      <p class="subtitle">Technical information about this website</p>
    </section>

    <section class="content-section">
      <h2>Technology Stack</h2>
      <div class="tech-stack">
        <div class="tech-item">
          <h3>Frontend</h3>
          <ul>
            <li>Vue.js 3 with Composition API</li>
            <li>TypeScript</li>
            <li>SCSS for styling</li>
            <li>Vue Router for navigation</li>
            <li>Font Awesome for icons</li>
          </ul>
        </div>

        <div class="tech-item">
          <h3>Build Tools</h3>
          <ul>
            <li>Vue CLI</li>
            <li>Webpack</li>
            <li>Babel</li>
            <li>ESLint</li>
          </ul>
        </div>

        <div class="tech-item">
          <h3>Deployment</h3>
          <ul>
            <li>GitHub Pages</li>
            <li>GitHub Actions for CI/CD</li>
        </ul>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>Features</h2>
      <ul class="features-list">
        <li>
          <strong>Developer Mode</strong> - Toggle to see additional technical
          content
        </li>
        <li>
          <strong>Dark/Light Mode</strong> - Automatically detects system
          preference with manual override
        </li>
        <li>
          <strong>Responsive Design</strong> - Optimized for all device sizes
        </li>
        <li>
          <strong>Single Page Application</strong> - Fast navigation between
          pages
        </li>
      </ul>
    </section>

    <section class="content-section">
      <h2>Performance Metrics</h2>
      <div class="metrics">
        <div class="metric-item">
          <h3>Lighthouse Score</h3>
          <div class="score-container">
            <div class="score">
              <span>Performance</span>
              <div class="score-value">95+</div>
            </div>
            <div class="score">
              <span>Accessibility</span>
              <div class="score-value">95+</div>
            </div>
            <div class="score">
              <span>Best Practices</span>
              <div class="score-value">95+</div>
            </div>
            <div class="score">
              <span>SEO</span>
              <div class="score-value">95+</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <h2>Source Code</h2>
      <p>
        This website is open source. You can view the code on
        <a
          href="https://github.com/yaq1n0/yaqinhasan.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub </a
        >.
      </p>
    </section>

    <section class="content-section">
      <h2>Easter Eggs</h2>
      <p>
        There are a few easter eggs hidden throughout the site. Can you find
        them all?
      </p>
      <p class="hint">Hint: Try <code>/cat.gif</code> in the URL 😉</p>
    </section>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this page
</script>

<style lang="scss" scoped>
.technical-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: map.get($spacing, "xl");

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }
}

.page-header {
  margin-bottom: map.get($spacing, "xl");
  text-align: center;

  h1 {
    font-family: var(--font-mono);
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin-bottom: map.get($spacing, "sm");
  }

  .subtitle {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-text-secondary);
  }
}

.content-section {
  margin-bottom: map.get($spacing, "xl");

  h2 {
    font-size: map.get($font-sizes, "2xl");
    margin-bottom: map.get($spacing, "md");
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-border);
    padding-bottom: map.get($spacing, "xs");
  }
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: map.get($spacing, "lg");

  .tech-item {
    background-color: var(--color-bg-tertiary);
    border-radius: map.get($border-radius, "md");
    padding: map.get($spacing, "lg");

    h3 {
      font-size: map.get($font-sizes, "xl");
      margin-bottom: map.get($spacing, "md");
      color: var(--color-accent);
    }

    ul {
      padding-left: map.get($spacing, "lg");

      li {
        margin-bottom: map.get($spacing, "sm");
        color: var(--color-text-primary);
      }
    }
  }
}

.features-list {
  padding-left: map.get($spacing, "lg");

  li {
    margin-bottom: map.get($spacing, "md");
    color: var(--color-text-primary);

    strong {
      color: var(--color-accent);
    }
  }
}

.metrics {
  .metric-item {
    background-color: var(--color-bg-tertiary);
    border-radius: map.get($border-radius, "md");
    padding: map.get($spacing, "lg");

    h3 {
      font-size: map.get($font-sizes, "xl");
      margin-bottom: map.get($spacing, "md");
      color: var(--color-accent);
    }
  }

  .score-container {
    display: flex;
    flex-wrap: wrap;
    gap: map.get($spacing, "md");

    .score {
      flex: 1;
      min-width: 120px;
      text-align: center;

      span {
        display: block;
        margin-bottom: map.get($spacing, "xs");
        color: var(--color-text-secondary);
      }

      .score-value {
        font-size: map.get($font-sizes, "2xl");
        font-weight: bold;
        color: var(--color-accent);
      }
    }
  }
}

.hint {
  font-style: italic;
  color: var(--color-text-secondary);
  margin-top: map.get($spacing, "md");

  code {
    background-color: var(--color-bg-tertiary);
    padding: map.get($spacing, "xs") map.get($spacing, "sm");
    border-radius: map.get($border-radius, "sm");
    font-family: var(--font-mono);
  }
}
</style>
