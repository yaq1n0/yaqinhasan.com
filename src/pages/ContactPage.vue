<template>
  <div class="contact-page">
    <section class="page-header">
      <h1>Contact Info & CV</h1>
    </section>

    <!-- Contact Container -->
    <div class="contact-container">
      <!-- Contact Box -->
      <ContactBox :items="['linkedin', 'email', 'github']" />

      <div class="info-box">
        <p>
          <strong>If you'd rather do things manually...</strong>
          <br>
          LinkedIn: https://www.linkedin.com/in/yaqinhasan
          <br>
          Email: yaqin.k.hasan@gmail.com
          <br>
          GitHub: https://github.com/yaq1n0
        </p>
      </div>
    </div>

    <div class="divider" />

    <p class="dev-note show-dev-only">
      I am planning to put a native web formatted version of my CV here
      eventually, but for now, I will simply embed a pdf version :)
      <br><u>Last CV update: 28th March 2024</u>
    </p>

    <!-- Download Links -->
    <div class="download-links">
      <Button
        label="Download as PDF"
        href="/CV_Yaqin_Hasan.pdf"
        icon="file-pdf"
        download
        shape="rounded"
        border="thin"
      />
      <Button
        label="Download as Word .docx"
        href="/CV_Yaqin_Hasan.docx"
        icon="file-word"
        download
        shape="rounded"
        border="thin"
      />
    </div>

    <!-- PDF Embed -->
    <div class="pdf-container">
      <iframe
        src="/CV_Yaqin_Hasan.pdf"
        class="pdf-embed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactBox from '@/components/ContactBox.vue';
import Button from '@/components/GButton.vue';
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

.info-box {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
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
  gap: map.get($spacing, "lg");
  margin-bottom: map.get($spacing, "xl");
  padding: map.get($spacing, "md");
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
