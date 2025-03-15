<template>
  <div class="not-found-page">
    <div class="content">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <router-link to="/" class="home-button">
        <font-awesome-icon :icon="['fas', 'home']" />
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional script needed for this page
</script>

<style lang="scss" scoped>

.not-found-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
  padding: map.get($spacing, "xl");

  .content {
    max-width: 600px;

    h1 {
      font-size: 8rem;
      font-weight: bold;
      color: var(--color-accent);
      margin: 0;
      line-height: 1;
    }

    h2 {
      font-size: map.get($font-sizes, "3xl");
      margin-bottom: map.get($spacing, "lg");
      color: var(--color-text-primary);
    }

    p {
      font-size: map.get($font-sizes, "lg");
      margin-bottom: map.get($spacing, "xl");
      color: var(--color-text-secondary);
    }

    .home-button {
      display: inline-flex;
      align-items: center;
      gap: map.get($spacing, "sm");
      padding: map.get($spacing, "md") map.get($spacing, "lg");
      background-color: var(--color-accent);
      color: white;
      border-radius: map.get($border-radius, "md");
      text-decoration: none;
      font-weight: 500;
      transition: background-color map.get($transitions, "base") ease;

      &:hover {
        background-color: var(--color-accent-dark);
      }
    }
  }

  @media (max-width: map.get($breakpoints, "md")) {
    .content {
      h1 {
        font-size: 6rem;
      }

      h2 {
        font-size: map.get($font-sizes, "2xl");
      }
    }
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    .content {
      h1 {
        font-size: 4rem;
      }
    }
  }
}
</style>
