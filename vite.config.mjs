import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { staticRouteGenerator } from "./plugins/staticRouteGenerator.js";
import { extractRoutes } from "./plugins/routeExtractor.js";
import fs from "fs";
import path from "path";

// Get routes from router configuration
const routes = extractRoutes();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Generate static HTML files for each route using our custom plugin
    staticRouteGenerator(routes),
    // Fix asset paths in 404.html
    {
      name: "fix-404-assets",
      apply: "build",
      enforce: "post",
      closeBundle: async () => {
        // Find the assets
        const distDir = path.resolve(process.cwd(), "dist");
        let mainJsFile = "";
        let mainCssFile = "";

        try {
          const assets = fs.readdirSync(path.join(distDir, "assets"));
          mainJsFile = assets.find((file) => file.startsWith("main") && file.endsWith(".js"));
          mainCssFile = assets.find((file) => file.startsWith("main") && file.endsWith(".css"));

          if (mainJsFile && mainCssFile) {
            // Read the 404.html file
            const file404Path = path.join(distDir, "404.html");
            if (fs.existsSync(file404Path)) {
              let content = fs.readFileSync(file404Path, "utf-8");
              // Update asset paths
              content = content.replace("/assets/main.js", `/assets/${mainJsFile}`);
              content = content.replace("/assets/main.css", `/assets/${mainCssFile}`);
              // Write the file back
              fs.writeFileSync(file404Path, content);
              console.log("Updated asset paths in 404.html");
            }
          }
        } catch (err) {
          console.error("Error updating 404.html:", err);
        }
      }
    }
  ],
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:map";
          @use "sass:list";
          @use "@/styles/_variables.scss" as *;
          @use "@/styles/_mixins.scss" as *;
        `
      }
    }
  },
  // Ensure all files in public folder are copied
  publicDir: "public",
  build: {
    assetsInlineLimit: 0, // Disable asset inlining
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url))
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
