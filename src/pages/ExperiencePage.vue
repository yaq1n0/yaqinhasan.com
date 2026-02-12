<template>
  <section class="page-header">
    <h1>Professional Experience</h1>
  </section>

  <div class="experience-container">
    <div class="additional-info">
      <p class="info-text">
        <font-awesome-icon :icon="['fas', 'info-circle']" />
        Looking for an exciting and challenging new role where I can expand on my technical and professional skills.
      </p>
    </div>

    <div class="experience-card">
      <div class="card-header">
        <div class="title-section">
          <h2>{{ experience.position }}</h2>
          <h3>{{ experience.name }}</h3>
        </div>
        <span>{{ experience.startDate }} - {{ experience.endDate }}</span>
      </div>

      <div class="card-content">
        <div class="achievements-section">
          <h4>Key Achievements & Responsibilities</h4>
          <ul class="achievements-list">
            <li v-for="(bullet, index) in experience.highlights" :key="index" class="achievement-item">
              <span class="bullet-icon">
                <font-awesome-icon :icon="['fas', 'caret-right']" />
              </span>
              <span class="bullet-text">{{ bullet }}</span>
            </li>
          </ul>
        </div>

        <div class="skills-section">
          <h4>Technologies & Skills</h4>
          <div class="skills-tags">
            <span class="skill-tag">Full-stack Development</span>
            <span class="skill-tag">REST APIs</span>
            <span class="skill-tag">AI Integration</span>
            <span class="skill-tag">SMTP Services</span>
            <span class="skill-tag">Data Syncing</span>
            <span class="skill-tag">Stripe Integration</span>
            <span class="skill-tag">CI/CD</span>
            <span class="skill-tag">GitHub Actions</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import cvData from "@/data/cv.json";

// Get the first (and only) work entry
const experience = computed(() => cvData.work[0]);
</script>

<style lang="scss" scoped>
.page-header {
  text-align: center;
  margin-bottom: map.get($spacing, "lg");

  h1 {
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin: 0;

    @media (max-width: map.get($breakpoints, "md")) {
      font-size: map.get($font-sizes, "2xl");
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "xl");
    }
  }
}

.experience-container {
  display: flex;
  flex-direction: column;
  padding: 0 map.get($spacing, "base");
  margin-bottom: map.get($spacing, "xl");
  gap: map.get($spacing, "xl");
}

.experience-card {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  @media (max-width: map.get($breakpoints, "md")) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
}

.card-header {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
  padding: map.get($spacing, "xl");
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: map.get($spacing, "md");

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    flex-direction: column;
    align-items: flex-start;
    padding: map.get($spacing, "md");
  }
}

.card-content {
  padding: map.get($spacing, "xl");

  @media (max-width: map.get($breakpoints, "md")) {
    padding: map.get($spacing, "lg");
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }
}

.achievements-section {
  margin-bottom: map.get($spacing, "2xl");

  h4 {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-accent);
    margin: 0 0 map.get($spacing, "lg") 0;
    font-weight: 600;
    padding-bottom: map.get($spacing, "sm");
    border-bottom: 2px solid var(--color-border-light);

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "base");
      margin-bottom: map.get($spacing, "md");
    }
  }
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievement-item {
  display: flex;
  align-items: flex-start;
  gap: map.get($spacing, "md");
  margin-bottom: map.get($spacing, "lg");
  line-height: 1.6;
  position: relative;
  padding-left: map.get($spacing, "xs");

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    gap: map.get($spacing, "sm");
    margin-bottom: map.get($spacing, "md");
  }

  .bullet-icon {
    color: var(--color-accent);
    font-size: map.get($font-sizes, "lg");
    flex-shrink: 0;
    margin-top: 2px;

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "base");
    }
  }

  .bullet-text {
    flex: 1;
    font-size: map.get($font-sizes, "base");
    color: var(--color-text);

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "sm");
    }
  }
}

.skills-section {
  h4 {
    font-size: map.get($font-sizes, "lg");
    color: var(--color-accent);
    margin: 0 0 map.get($spacing, "lg") 0;
    font-weight: 600;
    padding-bottom: map.get($spacing, "sm");
    border-bottom: 2px solid var(--color-border-light);

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "base");
      margin-bottom: map.get($spacing, "md");
    }
  }
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: map.get($spacing, "sm");
}

.skill-tag {
  background-color: var(--color-accent-translucent);
  color: var(--color-accent);
  padding: map.get($spacing, "xs") map.get($spacing, "md");
  border-radius: map.get($border-radius, "md");
  font-size: map.get($font-sizes, "sm");
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  @media (max-width: map.get($breakpoints, "sm")) {
    font-size: map.get($font-sizes, "xs");
    padding: map.get($spacing, "xs") map.get($spacing, "sm");
  }
}

.additional-info {
  background-color: var(--color-bg-secondary);
  border-radius: map.get($border-radius, "md");
  padding: map.get($spacing, "lg");
  border-left: 4px solid var(--color-accent);

  @media (max-width: map.get($breakpoints, "sm")) {
    padding: map.get($spacing, "md");
  }

  .info-text {
    margin: 0;
    font-size: map.get($font-sizes, "base");
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: map.get($spacing, "md");
    line-height: 1.6;

    svg {
      color: var(--color-accent);
      font-size: map.get($font-sizes, "lg");
      flex-shrink: 0;
    }

    @media (max-width: map.get($breakpoints, "sm")) {
      font-size: map.get($font-sizes, "sm");
      flex-direction: column;
      text-align: center;
      gap: map.get($spacing, "sm");
    }
  }
}
</style>
