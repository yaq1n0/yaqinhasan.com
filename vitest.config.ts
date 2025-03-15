import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";

// Base Vite configuration
const viteConfig = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

// Vitest specific configuration
export default mergeConfig(
  viteConfig,
  defineVitestConfig({
    test: {
      globals: true,
      environment: "happy-dom",
      include: ["src/tests/**/*.spec.ts"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
      },
    },
  }),
);
