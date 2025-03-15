<template>
  <div class="project-card">
    <div class="project-header">
      <h3>{{ project.title }}</h3>
      <div class="links">
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          class="link"
        >
          <font-awesome-icon :icon="['fab', 'github']" /> Source Code (GitHub)
        </a>
        <slot name="extra-links"></slot>
      </div>
    </div>

    <p v-if="project.summary" class="summary">{{ project.summary }}</p>

    <slot></slot>

    <div v-if="project.showDevContent" class="dev-content show-dev-only">
      <slot name="dev-content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Project {
  title: string;
  githubUrl?: string;
  summary?: string;
  showDevContent?: boolean;
}

defineProps<{
  project: Project;
}>();
</script>

<style lang="scss" scoped>
.project-card {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  padding: map.get($spacing, "xl");
  margin-bottom: map.get($spacing, "xl");
  animation: fadeIn 0.5s ease;

  .project-header {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: map.get($spacing, "lg");
    margin-bottom: map.get($spacing, "lg");
    padding-bottom: map.get($spacing, "md");
    border-bottom: 1px solid var(--color-border);

    h3 {
      font-size: map.get($font-sizes, "xl");
      color: var(--color-accent);
      margin: 0;
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: map.get($spacing, "sm");
    }
  }

  .summary {
    font-size: map.get($font-sizes, "lg");
    text-align: center;
    margin-bottom: map.get($spacing, "lg");
    color: var(--color-accent-light);
  }

  .link {
    display: inline-flex;
    align-items: center;
    gap: map.get($spacing, "xs");
    background-color: var(--color-accent-translucent);
    padding: map.get($spacing, "xs") map.get($spacing, "md");
    border-radius: map.get($border-radius, "md");
    transition: all 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-accent-light);
      color: var(--color-bg-primary);
    }
  }

  .dev-content {
    margin-top: map.get($spacing, "xl");
    padding: map.get($spacing, "lg");
    border: 2px solid var(--color-dev-highlight);
    border-radius: map.get($border-radius, "md");
  }

  h4 {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-accent-light);
    margin: map.get($spacing, "lg") 0 map.get($spacing, "sm");
  }

  p {
    margin-bottom: map.get($spacing, "md");
    line-height: 1.6;
  }

  ul {
    margin-bottom: map.get($spacing, "md");
    padding-left: map.get($spacing, "xl");

    li {
      margin-bottom: map.get($spacing, "xs");
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: map.get($breakpoints, "md")) {
  .project-card {
    padding: map.get($spacing, "lg");
  }
}
</style>
