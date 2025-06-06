import fs from "fs";
import path from "path";

/**
 * Extracts route paths from the router configuration file
 * @returns {Array<string>} Array of route paths
 */
export function extractRoutes() {
  try {
    // Read the router file
    const routerFilePath = path.resolve(process.cwd(), "src/router.ts");
    const routerContent = fs.readFileSync(routerFilePath, "utf-8");

    // Find the routes array in the router file
    const routeMatches = routerContent.match(
      /const\s+routes\s*:\s*Array<RouteRecordRaw>\s*=\s*\[([\s\S]*?)\];/,
    );

    if (!routeMatches || !routeMatches[1]) {
      console.warn("Could not find routes array in router.ts");
      return [];
    }

    // Extract route paths using regex
    const routeObjects = routeMatches[1].split(/},\s*{/);
    const paths = routeObjects
      .map((obj) => {
        const pathMatch = obj.match(/path\s*:\s*["']([^"']+)["']/);
        return pathMatch ? pathMatch[1] : null;
      })
      .filter(Boolean);

    console.log("Extracted routes from router.ts:", paths);
    return paths;
  } catch (error) {
    console.error("Error extracting routes:", error);
    return [];
  }
}
