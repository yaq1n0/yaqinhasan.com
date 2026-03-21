import type { Ref } from "vue";
import type { Router, RouteLocationNormalizedLoaded } from "vue-router";
import type { Command, AddOutputFn } from "./Command";

export function createNavigationCommands(addOutput: AddOutputFn, router: Router, route: RouteLocationNormalizedLoaded, isDevMode: Ref<boolean>): Command[] {
  return [
    {
      name: "ls",
      description: "List available pages",
      execute: () => {
        addOutput("output", "<strong>Available pages:</strong>");
        addOutput("output", "");
        addOutput("output", "  <span style='color: var(--color-accent);'>home</span>         Home Page");
        addOutput("output", "  <span style='color: var(--color-accent);'>experience</span>   Professional Experience");
        addOutput("output", "  <span style='color: var(--color-accent);'>projects</span>    Personal Projects ");

        if (isDevMode.value) {
          addOutput("output", "");
          addOutput("output", "  <span style='color: var(--color-dev-highlight);'>debug</span>        Debug page [dev]");
          addOutput("output", "  <span style='color: var(--color-dev-highlight);'>debug-carousel</span> Carousel debug [dev]");
        } else {
          addOutput("output", "<span style='opacity: 0.5;'>Use 'dev --enable' to show developer pages</span>");
        }
      }
    },
    {
      name: "cd",
      description: "Navigate to a page (e.g., cd /projects)",
      execute: (args) => {
        if (args.length === 0) {
          router.push("/");
          addOutput("success", "Navigating to home...");
          return;
        }

        let path = args[0].toLowerCase();

        if (!path.startsWith("/")) {
          path = "/" + path;
        }

        const validPaths = ["/", "/home", "/experience", "/projects"];

        if (isDevMode.value) {
          validPaths.push("/debug", "/debug-carousel");
        }

        if (path === "/home") {
          path = "/";
        }

        if (validPaths.includes(path)) {
          router.push(path);
          addOutput("success", `Navigating to ${path}...`);
        } else {
          addOutput("error", `cd: ${path}: No such page`);
          addOutput("info", "Try 'ls' to see available pages");
        }
      }
    },
    {
      name: "pwd",
      description: "Print current page/route",
      execute: () => {
        addOutput("output", route.path);
      }
    }
  ];
}
