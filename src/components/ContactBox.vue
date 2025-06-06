<template>
  <div class="contact-box">
    <g-button
      v-if="showItem('cv')"
      label="CV"
      to="/contact"
      icon="file-alt"
      icon-size="lg"
      label-pos="below"
      shape="squircle"
      border="none"
      background="transparent"
    />
    <g-button
      v-if="showItem('linkedin')"
      label="LinkedIn"
      href="https://www.linkedin.com/in/yaqinhasan"
      icon="linkedin"
      icon-prefix="fab"
      icon-size="lg"
      label-pos="below"
      shape="squircle"
      border="none"
      background="transparent"
    />
    <g-button
      v-if="showItem('email')"
      label="Email"
      href="mailto:yaqin.k.hasan@gmail.com"
      icon="envelope"
      icon-size="lg"
      label-pos="below"
      shape="squircle"
      border="none"
      background="transparent"
    />
    <g-button
      v-if="showItem('github')"
      label="GitHub"
      href="https://github.com/yaq1n0"
      icon="github"
      icon-prefix="fab"
      icon-size="lg"
      label-pos="below"
      shape="squircle"
      border="none"
      background="transparent"
    />
  </div>
</template>

<script setup lang="ts">
import GButton from "@/components/GButton.vue";

type ContactItem = "cv" | "linkedin" | "email" | "github";
const props = defineProps<{
  items?: ContactItem[];
}>();

const showItem = (item: ContactItem) => (props.items ? props.items.includes(item) : true);
</script>

<style lang="scss" scoped>
.contact-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: map.get($spacing, "lg");
  margin: map.get($spacing, "lg") 0;
  padding: map.get($spacing, "md");
  border-radius: map.get($border-radius, "lg");
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: map.get($breakpoints, "md")) {
  .contact-box {
    gap: map.get($spacing, "md");
  }
}
</style>
