import type { Command, CommandContext } from "./Commands";

export function createNavigationCommands(context: CommandContext): Command[] {
  const { addOutput, isDevMode, navigate, currentPath } = context;

  return [
    {
      name: "ls",
      description: "List available pages",
      execute: () => {
        addOutput("output", "<strong>Available pages:</strong>");
        addOutput("output", "");
        addOutput("output", "  <span style='color: var(--color-accent);'>home</span>         Landing page");
        addOutput("output", "  <span style='color: var(--color-accent);'>about</span>        Skills & education");
        addOutput("output", "  <span style='color: var(--color-accent);'>experience</span>   Work experience");
        addOutput("output", "  <span style='color: var(--color-accent);'>projects</span>    Portfolio showcase");
        addOutput("output", "  <span style='color: var(--color-accent);'>interests</span>   Personal interests");

        if (isDevMode) {
          addOutput("output", "");
          addOutput("output", "  <span style='color: var(--color-dev);'>debug</span>        Debug page [dev]");
          addOutput("output", "  <span style='color: var(--color-dev);'>debug-carousel</span> Carousel debug [dev]");
        } else {
          addOutput("output", "<span style='opacity: 0.5;'>Use 'dev --enable' to show developer pages</span>");
        }
      }
    },
    {
      name: "cd",
      description: "Navigate to a page (e.g., cd /about)",
      execute: (args) => {
        if (!navigate) {
          addOutput("error", "Navigation not available");
          return;
        }

        if (args.length === 0) {
          navigate("/");
          addOutput("success", "Navigating to home...");
          return;
        }

        let path = args[0].toLowerCase();

        // Handle relative paths
        if (!path.startsWith("/")) {
          path = "/" + path;
        }

        // Valid paths
        const validPaths = ["/", "/home", "/about", "/experience", "/projects", "/interests"];

        // Add dev paths if in dev mode
        if (isDevMode) {
          validPaths.push("/debug", "/debug-carousel");
        }

        // Normalize path
        if (path === "/home") {
          path = "/";
        }

        if (validPaths.includes(path)) {
          navigate(path);
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
        const path = currentPath || window.location.pathname;
        addOutput("output", path);
      }
    }
  ];
}
