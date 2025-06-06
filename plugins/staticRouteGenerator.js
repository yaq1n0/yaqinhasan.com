import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Plugin to generate static HTML files for each route
 * @param {Array<string>} routes - List of route paths
 * @returns {Object} - Vite plugin
 */
export function staticRouteGenerator(routes = []) {
  let template = "";
  let mainJsPath = "";
  let mainCssPath = "";

  return {
    name: "static-route-generator",
    apply: "build",
    enforce: "post",
    configResolved: async () => {
      // Get template from file
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const templatePath = path.resolve(__dirname, "../templates/routeTemplate.html");
      template = await fs.readFile(templatePath, "utf-8");
    },
    generateBundle(options, bundle) {
      // Skip if no template found
      if (!template) {
        console.warn("Route template not found, skipping static HTML generation");
        return;
      }

      // Find main.js and main.css files
      for (const fileName in bundle) {
        if (fileName.includes("main") && fileName.endsWith(".js")) {
          mainJsPath = fileName;
        } else if (fileName.includes("main") && fileName.endsWith(".css")) {
          mainCssPath = fileName;
        }
      }

      // Generate HTML for each route
      for (const route of routes) {
        if (route === "/" || route.includes("*")) continue; // Skip root and catch-all routes

        // Create path for the HTML file
        const fileName = route.endsWith("/") ? `${route}index.html` : `${route}.html`;

        // Calculate relative path for assets
        const depth = (route.match(/\//g) || []).length;
        const assetPrefix = depth > 1 ? "../".repeat(depth - 1) : "./";

        // Generate HTML with route data and correct asset paths
        let htmlContent = template.replace(/\{\{ROUTE_PATH\}\}/g, route);
        htmlContent = htmlContent.replace("/assets/main.js", `${assetPrefix}${mainJsPath}`);
        htmlContent = htmlContent.replace("/assets/main.css", `${assetPrefix}${mainCssPath}`);

        // Add HTML file to build output
        this.emitFile({
          type: "asset",
          fileName: fileName.startsWith("/") ? fileName.slice(1) : fileName,
          source: htmlContent
        });
      }
    }
  };
}
