<template>
  <div class="app-container">
    <NavBar />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
});
</script>

<style lang="scss">
@forward "@/styles/main";

.app-container {
  @include flex(column);
  min-height: 100vh;
}

.main-content {
  @include flex(column);
  flex: 1;
}
</style>
