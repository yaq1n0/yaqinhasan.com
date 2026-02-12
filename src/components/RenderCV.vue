<template>
  <div class="cv-container" :class="{ 'print-mode': isPrintMode }">
    <!-- Header -->
    <header class="cv-header">
      <div class="header-left">
        <h1 class="name">{{ cv.basics?.name }}</h1>
        <div class="contact-details">
          <p v-if="cv.basics?.url">
            Portfolio: <a :href="cv.basics?.url">{{ cv.basics?.url }}</a>
          </p>
          <p v-for="profile in cv.basics?.profiles" :key="profile.network">
            {{ profile.network }}: <a :href="profile.url">{{ profile.url }}</a>
          </p>
          <p v-if="cv.basics?.email">
            Email: <a :href="`mailto:${cv.basics?.email}`">{{ cv.basics?.email }}</a>
          </p>
          <p v-if="cv.basics?.phone">Phone: {{ cv.basics?.phone }}</p>
          <p v-if="cv.basics?.location">
            {{ cv.basics?.location.city }}<span v-if="cv.basics?.location.region">, {{ cv.basics?.location.region }}</span>
          </p>
        </div>
      </div>
      <div class="header-right">
        <p v-if="cv.basics?.label" class="tagline">{{ cv.basics?.label }}</p>
        <p v-if="cv.basics?.summary" class="objective">{{ cv.basics?.summary }}</p>
      </div>
    </header>

    <hr class="section-divider" />

    <!-- Experience Section -->
    <section v-if="cv.work?.length" class="cv-section">
      <h2 class="section-title">Experience</h2>
      <div v-for="job in cv.work" :key="job.name" class="experience-item">
        <div class="item-header">
          <h3 class="company">{{ job.name }} ({{ job.startDate }} - {{ job.endDate || "Present" }})</h3>
          <p v-if="job.position" class="role">{{ job.position }}</p>
        </div>
        <ul v-if="job.highlights?.length" class="bullets">
          <li v-for="(highlight, idx) in job.highlights" :key="idx">{{ highlight }}</li>
        </ul>
      </div>
    </section>

    <!-- Education Section -->
    <section v-if="cv.education?.length" class="cv-section">
      <h2 class="section-title">Education</h2>
      <div v-for="edu in cv.education" :key="edu.institution + edu.startDate" class="education-item">
        <div class="item-header">
          <h3 class="institution">{{ edu.institution }} ({{ edu.startDate }} - {{ edu.endDate }})</h3>
          <p v-if="edu.studyType" class="degree">{{ edu.studyType }}</p>
        </div>
        <ul v-if="edu.courses?.length" class="subsections">
          <li v-for="course in edu.courses" :key="course">{{ course }}</li>
        </ul>
        <p v-if="edu.score" class="grade">{{ edu.score }}</p>
      </div>
    </section>

    <!-- Projects Section -->
    <section v-if="cv.projects?.length" class="cv-section">
      <h2 class="section-title">Projects</h2>
      <div v-for="project in cv.projects" :key="project.name" class="project-item">
        <h3 class="project-name">
          <span class="project-title"
            >{{ project.name }} ({{ project.startDate }}<span v-if="project.endDate"> - {{ project.endDate }}</span
            >)</span
          >
          <span class="project-colon">:</span>
          <span class="project-description">{{ project.description }}</span>
        </h3>
        <p v-if="project.keywords?.length" class="skills-list">
          <em>Skills: {{ project.keywords.join(", ") }}</em>
        </p>
      </div>
    </section>

    <!-- Skills Section -->
    <section v-if="cv.skills?.length" class="cv-section">
      <h2 class="section-title">Skills</h2>
      <div v-for="skill in cv.skills" :key="skill.name" class="skill-category">
        <h3 class="category-name">{{ skill.name }}</h3>
        <ul v-if="skill.keywords?.length" class="skill-items">
          <li v-for="(keyword, idx) in skill.keywords" :key="idx">{{ keyword }}</li>
        </ul>
      </div>
    </section>

    <!-- Personal Interests Section -->
    <section v-if="cv.interests?.length" class="cv-section">
      <h2 class="section-title">Personal Interests</h2>
      <ul class="interests-list">
        <li v-for="interest in cv.interests" :key="interest.name">{{ interest.name }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { CV } from "@/data/models/CV";
import { usePrintMode } from "@/composables/UsePrintMode";

defineProps<{
  cv: CV;
}>();

const { isPrintMode } = usePrintMode();
</script>

<style lang="scss" scoped>
.cv-container {
  max-width: 900px;
  margin: 0 auto;
  padding: map.get($spacing, "lg");
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 11pt;
  line-height: 1.4;
  color: var(--color-text);
  background: var(--color-bg);

  &.print-mode {
    max-width: 210mm;
    padding: 10mm 15mm;
    background: white;
    color: #000;
    font-size: 10pt;
    line-height: 1.3;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
}

// Header Styles
.cv-header {
  display: flex;
  justify-content: space-between;
  gap: map.get($spacing, "lg");
  margin-bottom: map.get($spacing, "md");
  padding-bottom: map.get($spacing, "md");
  border-bottom: 3px solid #0891b2;

  .print-mode & {
    border-bottom-color: #000;
  }
}

.header-left {
  flex: 0 0 auto;
}

.header-right {
  flex: 1;
  text-align: right;
  max-width: 45%;
}

.name {
  font-size: 24pt;
  font-weight: normal;
  margin: 0 0 map.get($spacing, "sm");
  color: var(--color-text);

  .print-mode & {
    color: #000;
  }
}

.contact-details {
  font-family: "Courier New", Courier, monospace;
  font-size: 9pt;

  p {
    margin: 2px 0;
  }

  a {
    color: var(--color-accent);

    .print-mode & {
      color: inherit;
    }
  }
}

.tagline {
  font-size: 11pt;
  color: #0891b2;
  font-weight: 500;
  margin: 0 0 map.get($spacing, "xs");

  .print-mode & {
    color: #000;
  }
}

.objective {
  font-size: 10pt;
  font-style: italic;
  margin: 0;
  color: var(--color-text-secondary);

  .print-mode & {
    color: #333;
  }
}

// Section Styles
.section-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: map.get($spacing, "md") 0;

  .print-mode & {
    border-top-color: #ccc;
  }
}

.cv-section {
  margin-bottom: map.get($spacing, "lg");

  .print-mode & {
    margin-bottom: 12pt;
  }
}

.section-title {
  font-size: 14pt;
  font-weight: bold;
  color: #0891b2;
  margin: 0 0 map.get($spacing, "sm");
  border-bottom: 1px solid #0891b2;
  padding-bottom: 4px;

  .print-mode & {
    color: #000;
    border-bottom-color: #000;
  }
}

// Experience Styles
.experience-item {
  margin-bottom: map.get($spacing, "md");

  .print-mode & {
    margin-bottom: 8pt;
  }
}

.item-header {
  margin-bottom: map.get($spacing, "xs");
}

.company,
.institution {
  font-size: 12pt;
  font-weight: bold;
  margin: 0;
  color: var(--color-text);

  .print-mode & {
    color: #000;
  }
}

.role,
.degree {
  font-size: 10pt;
  font-style: italic;
  margin: 2px 0 0;
  color: var(--color-text-secondary);

  .print-mode & {
    color: #333;
  }
}

.bullets,
.subsections {
  margin: map.get($spacing, "xs") 0 0 map.get($spacing, "lg");
  padding: 0;
  list-style-type: disc;

  li {
    margin-bottom: 4px;
    font-size: 10pt;
  }

  .print-mode & {
    margin-left: 20pt;

    li {
      margin-bottom: 2pt;
    }
  }
}

// Education Styles
.education-item {
  margin-bottom: map.get($spacing, "md");

  .print-mode & {
    margin-bottom: 8pt;
  }
}

.grade {
  font-size: 10pt;
  font-style: italic;
  margin: 4px 0 0 map.get($spacing, "lg");
  color: var(--color-text-secondary);

  .print-mode & {
    margin-left: 20pt;
    color: #333;
  }
}

// Project Styles
.project-item {
  margin-bottom: map.get($spacing, "sm");

  .print-mode & {
    margin-bottom: 6pt;
  }
}

.project-name {
  font-size: 10pt;
  font-weight: normal;
  margin: 0;
  display: block;
}

.project-title {
  font-weight: bold;
}

.project-colon {
  margin: 0 4px;
}

.project-description {
  font-weight: normal;
}

.skills-list {
  font-size: 9pt;
  color: var(--color-text-secondary);
  margin: 2px 0 0 map.get($spacing, "lg");

  .print-mode & {
    margin-left: 20pt;
    color: #555;
  }
}

// Skills Styles
.skill-category {
  margin-bottom: map.get($spacing, "sm");

  .print-mode & {
    margin-bottom: 6pt;
  }
}

.category-name {
  font-size: 11pt;
  font-weight: bold;
  margin: 0 0 4px;
  color: var(--color-text);

  .print-mode & {
    color: #000;
  }
}

.skill-items {
  margin: 0 0 0 map.get($spacing, "lg");
  padding: 0;
  list-style-type: circle;

  li {
    font-size: 10pt;
    margin-bottom: 2px;
  }

  .print-mode & {
    margin-left: 20pt;
  }
}

// Interests Styles
.interests-list {
  margin: 0 0 0 map.get($spacing, "lg");
  padding: 0;
  list-style-type: disc;

  li {
    font-size: 10pt;
    margin-bottom: 4px;
  }

  .print-mode & {
    margin-left: 20pt;
  }
}

// Print Media Query
@media print {
  .cv-container {
    max-width: 100%;
    padding: 0;
    background: white;
    color: #000;
    font-size: 10pt;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .section-divider {
    border-top-color: #ccc;
  }

  .cv-section {
    margin-bottom: 10pt;
    page-break-inside: avoid;
  }
}
</style>
