<template>
  <div class="contact-page">
    <section class="page-header">
      <h1>Contact Info & CV</h1>
    </section>

    <!-- Contact Container -->
    <div class="contact-container">
      <!-- Contact Box -->
      <div class="contact-box">
        <div class="contact-item">
          <a href="https://github.com/yaq1n0" target="_blank" class="icon-link">
            <font-awesome-icon :icon="['fab', 'github']" size="2x" />
          </a>
          <span>GitHub</span>
        </div>

        <div class="contact-item">
          <a
            href="https://www.linkedin.com/in/yaqinhasan"
            target="_blank"
            class="icon-link"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="2x" />
          </a>
          <span>LinkedIn</span>
        </div>

        <div class="contact-item">
          <a href="mailto:yaqin.k.hasan@gmail.com" class="icon-link">
            <font-awesome-icon :icon="['fas', 'envelope']" size="2x" />
          </a>
          <span>Email</span>
        </div>
      </div>

      <div class="info-box">
        <p>
          <strong>If you'd rather do things manually...</strong>
          <br />- Email: yaqin.k.hasan@gmail.com <br />- GitHub:
          https://github.com/yaq1n0 <br />- LinkedIn:
          https://www.linkedin.com/in/yaqinhasan
        </p>
      </div>
    </div>

    <div class="divider"></div>

    <p class="dev-note show-dev-only">
      I am planning to put a native web formatted version of my CV here
      eventually, but for now, I will simply embed a pdf version :)
      <br /><u>Last CV update: 28th March 2024</u>
    </p>

    <!-- Download Links -->
    <div class="download-links">
      <a href="/CV_Yaqin_Hasan.pdf" download class="download-link">
        <font-awesome-icon :icon="['fas', 'file-pdf']" /> Download as PDF
      </a>
      <a href="/CV_Yaqin_Hasan.docx" download class="download-link">
        <font-awesome-icon :icon="['fas', 'file-word']" /> Download as Word
        .docx
      </a>
    </div>

    <!-- PDF Embed -->
    <div class="pdf-container">
      <iframe src="/CV_Yaqin_Hasan.pdf" class="pdf-embed"></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
// No specific script logic needed for this component
</script>

<style lang="scss" scoped>

.contact-page {
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
    font-size: map.get($font-sizes, "3xl");
    color: var(--color-accent);
    margin-bottom: map.get($spacing, "sm");
  }
}

.contact-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: map.get($spacing, "xl");
  margin-bottom: map.get($spacing, "xl");

  @media (max-width: map.get($breakpoints, "md")) {
    gap: map.get($spacing, "lg");
  }
}

.contact-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: map.get($spacing, "lg");
  justify-content: center;

  .contact-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: map.get($spacing, "xs");
    padding: map.get($spacing, "md");
    background-color: var(--color-bg-tertiary);
    border-radius: map.get($border-radius, "md");
    min-width: 100px;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-5px);
    }

    .icon-link {
      color: var(--color-accent);
      transition: color 0.2s ease;

      &:hover {
        color: var(--color-accent-light);
      }
    }

    span {
      font-size: map.get($font-sizes, "sm");
      margin-top: map.get($spacing, "xs");
    }
  }
}

.info-box {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "md");
  padding: map.get($spacing, "lg");
  border: 1px solid var(--color-border);
  max-width: 500px;

  p {
    margin: 0;
    line-height: 1.6;
  }
}

.divider {
  height: 1px;
  background-color: var(--color-border);
  margin: map.get($spacing, "xl") 0;
}

.dev-note {
  text-align: center;
  color: var(--color-dev-highlight);
  margin-bottom: map.get($spacing, "lg");
}

.download-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map.get($spacing, "md");
  margin-bottom: map.get($spacing, "xl");

  .download-link {
    display: inline-flex;
    align-items: center;
    gap: map.get($spacing, "xs");
    background-color: var(--color-accent-translucent);
    padding: map.get($spacing, "sm") map.get($spacing, "lg");
    border-radius: map.get($border-radius, "md");
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
      transform: translateY(-2px);
      background-color: var(--color-accent-light);
      color: var(--color-bg-primary);
    }
  }
}

.pdf-container {
  display: flex;
  justify-content: center;
  margin-top: map.get($spacing, "lg");
}

.pdf-embed {
  width: 100%;
  max-width: 800px;
  height: 1000px;
  border: none;
  border-radius: map.get($border-radius, "md");
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: map.get($breakpoints, "md")) {
    height: 800px;
  }

  @media (max-width: map.get($breakpoints, "sm")) {
    height: 600px;
  }
}
</style>
