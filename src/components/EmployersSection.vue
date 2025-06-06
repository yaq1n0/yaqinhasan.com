<template>
  <CollapsibleSection
    v-model="isOpen"
    title="For Employers!"
    class="show-landscape-only"
  >
    <p class="top-paragraph">
      If you got here from a job application I made, here are some things you
      might be looking for.
    </p>

    <div class="text-box">
      <Button
        label="Skills List"
        to="/about"
        icon="list-check"
        shape="rounded"
        border="thin"
      />
      <Button
        label="Modules List"
        to="/about"
        icon="book"
        shape="rounded"
        border="thin"
      />
      <Button
        label="Projects List"
        to="/projects"
        icon="code"
        shape="rounded"
        border="thin"
      />
      <Button
        label="Interests List"
        to="/interests"
        icon="heart"
        shape="rounded"
        border="thin"
      />
    </div>

    <ContactBox />
  </CollapsibleSection>

  <!-- For Employers Section (Mobile) -->
  <div class="content-box show-portrait-only">
    <p class="top-header">
      For Employers!
    </p>

    <p class="top-paragraph">
      If you got here from a job application I made, here are some things you
      might be looking for.
    </p>

    <div class="text-box">
      <Button
        label="Skills List"
        to="/about"
        icon="list-check"
        shape="rounded"
        border="thin"
      />
      <Button
        label="Modules List"
        to="/about"
        icon="book"
        shape="rounded"
        border="thin"
      />
      <Button
        label="Projects List"
        to="/projects"
        icon="code"
        shape="rounded"
        border="thin"
      />
      <Button
        label="Interests List"
        to="/interests"
        icon="heart"
        shape="rounded"
        border="thin"
      />
    </div>

    <ContactBox />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CollapsibleSection from "@/components/CollapsibleSection.vue";
import Button from "@/components/GButton.vue";
import ContactBox from "@/components/ContactBox.vue";

const isOpen = ref(true);
</script>

<style lang="scss" scoped>
/* Content box for mobile */
.content-box {
  background-color: var(--color-bg-tertiary);
  border-radius: map.get($border-radius, "lg");
  margin: map.get($spacing, "md") 0;
  padding: map.get($spacing, "lg");
}

/* Text styles */
.top-header {
  text-align: center;
  color: var(--color-accent);
  margin: map.get($spacing, "lg") 0;
  font-size: map.get($font-sizes, "2xl");
}

.top-paragraph {
  line-height: 1.6;
  max-width: 800px;
  margin: map.get($spacing, "lg") auto;
  animation: fadeIn 1s ease-in;
}

/* Text box with links */
.text-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map.get($spacing, "sm");
  margin: map.get($spacing, "lg") 0;
}

/* Display utilities */
.show-landscape-only {
  @media (max-width: map.get($breakpoints, "md")) {
    display: none !important;
  }
}

.show-portrait-only {
  @media (min-width: map.get($breakpoints, "md")) {
    display: none !important;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
