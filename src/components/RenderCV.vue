<template>
  <div class="cv-container" :class="{ 'print-mode': isCVPage }">
    <!-- Header -->
    <header class="cv-header">
      <h1 class="name">{{ cv.basics?.name }}</h1>
      <p v-if="cv.basics?.label" class="tagline">{{ cv.basics?.label }}</p>
      <p v-if="cv.basics?.summary" class="objective">{{ cv.basics?.summary }}</p>
      <div class="contact-details">
        <div v-if="contactLinks.length">
          <template v-for="(item, idx) in contactLinks" :key="idx"
            ><span v-if="idx > 0" class="sep"> · </span><a v-if="item.href" :href="item.href">{{ item.text }}</a
            ><span v-else>{{ item.text }}</span>
          </template>
        </div>
        <div v-if="contactDetails.length">
          <template v-for="(item, idx) in contactDetails" :key="idx"
            ><span v-if="idx > 0" class="sep"> · </span><a v-if="item.href" :href="item.href">{{ item.text }}</a
            ><span v-else>{{ item.text }}</span>
          </template>
        </div>
        <div>Open to relocation · Visa sponsorship required</div>
      </div>
    </header>

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
        <div v-if="edu.courses?.length" class="degree-subtitle">
          {{ buildCoursesLine(edu.courses) }}
        </div>
        <p v-if="edu.score" class="grade">{{ edu.score }}</p>
      </div>
    </section>

    <!-- Projects Section -->
    <section v-if="cv.projects?.length" class="cv-section">
      <h2 class="section-title">Personal Projects</h2>
      <div v-for="project in cv.projects" :key="project.name" class="project-item">
        <h3 class="project-name">
          <span class="project-title">{{ project.name }}</span>
          <br v-if="project.description" />
          <span class="project-description">{{ project.description }}</span>
        </h3>
        <p v-if="project.keywords?.length" class="skills-list">
          <em>{{ project.keywords.join(" • ") }}</em>
        </p>
      </div>
    </section>

    <!-- Skills Section -->
    <section v-if="cv.skills?.length" class="cv-section">
      <h2 class="section-title">Skills</h2>
      <ul class="skills-list">
        <li v-for="skill in cv.skills" :key="skill.name" class="skill-row">
          <span class="category-name">{{ skill.name }}:</span>
          {{ skill.keywords?.join(", ") }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { CV } from "@/data/models/CV";
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps<{
  cv: CV;
}>();

const route = useRoute();
const isCVPage = computed(() => route.path === "/cv");

/** remove https:// from valid links and make them pretty for display */
const simplifyLink = (url?: string) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "");
};

type ContactItem = {
  text: string;
  href?: string;
};

const contactLinks = computed(() => {
  const items: ContactItem[] = [];
  const basics = props.cv.basics;
  if (basics?.url) items.push({ text: simplifyLink(basics.url), href: basics.url });
  for (const p of basics?.profiles ?? []) items.push({ text: simplifyLink(p.url), href: p.url });
  return items;
});

const contactDetails = computed(() => {
  const items: ContactItem[] = [];
  const basics = props.cv.basics;
  if (basics?.email) items.push({ text: basics.email, href: `mailto:${basics.email}` });
  if (basics?.phone) items.push({ text: basics.phone });
  if (basics?.location) {
    const location = basics.location;
    const locationText = [location.city, location.countryCode].filter((x) => !!x).join(", ");
    if (locationText) items.push({ text: locationText });
  }
  return items;
});

const buildCoursesLine = (courses: string[]) => {
  if (courses.length === 0) return undefined;
  return `Specialist Modules: ${courses.join(", ")}`;
};
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
    padding: 0; // remove margins in print mode, since the margins are added by the pdf renderer
    background: white;
    color: #000;
    font-size: 9pt;
    line-height: 1.15;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
}

// Header Styles
.cv-header {
  text-align: center;
  margin-bottom: map.get($spacing, "md");
  padding-bottom: map.get($spacing, "md");

  .print-mode & {
    margin-bottom: 5pt;
    padding-bottom: 0;
  }
}

.name {
  font-size: 24pt;
  font-weight: normal;
  margin: 0 0 map.get($spacing, "xs");
  color: var(--color-text);

  .print-mode & {
    color: #000;
    font-size: 18pt;
    margin: 0 0 2pt;
  }
}

.tagline {
  font-size: 11pt;
  color: #0891b2;
  font-weight: 500;
  margin: 0 0 map.get($spacing, "xs");

  .print-mode & {
    color: #000;
    font-size: 9pt;
    margin: 0 0 2pt;
  }
}

.objective {
  font-size: 10pt;
  font-style: italic;
  margin: 0 0 map.get($spacing, "sm");
  color: var(--color-text-secondary);

  .print-mode & {
    color: #333;
    margin: 0 0 2pt;
  }
}

.contact-details {
  font-family: "Courier New", Courier, monospace;
  font-size: 9pt;

  a {
    color: var(--color-accent);

    .print-mode & {
      color: inherit;
    }
  }
}

.cv-section {
  margin-bottom: map.get($spacing, "lg");

  .print-mode & {
    margin-bottom: 5pt;
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
    font-size: 11pt;
    margin: 0 0 3pt;
    padding-bottom: 3px;
  }
}

// Experience Styles
.experience-item {
  margin-bottom: map.get($spacing, "md");

  .print-mode & {
    margin-bottom: 4pt;
  }
}

.item-header {
  margin-bottom: map.get($spacing, "xs");

  .print-mode & {
    margin-bottom: 1pt;
  }
}

.company,
.institution {
  font-size: 12pt;
  font-weight: bold;
  margin: 0;
  color: var(--color-text);

  .print-mode & {
    color: #000;
    font-size: 10pt;
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

.degree-subtitle {
  font-size: 9pt;
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
    margin: 2pt 0 0 14pt;

    li {
      margin-bottom: 1pt;
    }
  }
}

// Education Styles
.education-item {
  margin-bottom: map.get($spacing, "md");

  .print-mode & {
    margin-bottom: 4pt;
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
    margin-bottom: 2pt;
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

.project-description {
  font-weight: normal;
}

.skills-list {
  font-size: 9pt;
  color: var(--color-text-secondary);

  .print-mode & {
    color: #555;
  }
}

// Skills Styles
.skills-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.skill-row {
  font-size: 10pt;
  margin-bottom: 3px;
  color: var(--color-text-secondary);

  .print-mode & {
    color: #333;
    margin-bottom: 1pt;
  }
}

.category-name {
  font-weight: bold;
  color: var(--color-text);

  .print-mode & {
    color: #000;
  }
}
</style>
