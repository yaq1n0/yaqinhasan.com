import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue()],
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      // Copy pre-rendered index.html as 404.html for GitHub Pages unknown-route fallback.
      // Vue Router's catch-all will handle rendering NotFoundPage on the client.
      const distDir = path.resolve(process.cwd(), "dist");
      fs.copyFileSync(path.join(distDir, "index.html"), path.join(distDir, "404.html"));
    }
  },
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    port: 3000
  },
  publicDir: "public",
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("/node_modules/vue/") || id.includes("/node_modules/vue-router/")) return "vue";
          if (id.includes("/node_modules/swiper/")) return "swiper";
          if (id.includes("/node_modules/@vueuse/")) return "vueuse";
          if (id.includes("/node_modules/@fortawesome/")) return "fontawesome";
        }
      }
    },
    outDir: "dist"
  },
  test: {
    globals: true,
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"]
    }
  }
});
