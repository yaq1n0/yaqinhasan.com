import type { useTheme } from "@/composables/theme/UseTheme";
import { executeThemeCommand } from "./ThemeCommands";

export interface OutputLine {
  type: "command" | "output" | "error" | "success" | "info";
  content: string;
}

export interface Command {
  name: string;
  description: string;
  aliases?: string[];
  execute: (args: string[]) => void;
}

export interface CommandContext {
  addOutput: (type: OutputLine["type"], content: string) => void;
  isDevMode: boolean;
  toggleDevMode: () => void;
  navigate?: (path: string) => void;
  currentPath?: string;
  theme?: ReturnType<typeof useTheme>;
}

export function createCommands(context: CommandContext): Command[] {
  const { addOutput, isDevMode, toggleDevMode, navigate, currentPath, theme } = context;

  const simpleCommands: Command[] = [
    {
      name: "help",
      description: "Display available commands",
      aliases: ["man", "?"],
      execute: () => {
        addOutput("info", "<strong>Available Commands:</strong>");
        addOutput("output", "");

        // Get commands dynamically to ensure we show all registered commands
        const commands = createCommands(context);
        commands.forEach((cmd) => {
          const cmdName = cmd.aliases ? `${cmd.name} (${cmd.aliases.join(", ")})` : cmd.name;
          addOutput("output", `  <strong>${cmdName.padEnd(25)}</strong> ${cmd.description}`);
        });

        addOutput("output", "");
        addOutput("info", "Use arrow keys (↑/↓) to navigate command history");
        addOutput("info", "Press TAB for command suggestions");
      }
    },
    {
      name: "clear",
      description: "Clear the terminal screen",
      aliases: ["cls"],
      execute: () => {
        // This will be handled by the composable
        addOutput("info", "__CLEAR__");
      }
    },
    {
      name: "whoami",
      description: "Display site owner information + contact details",
      execute: () => {
        addOutput("output", "<strong>Yaqin Hasan</strong>");
        addOutput("output", "");
        addOutput("output", "  Email:  yaqin.k.hasan@gmail.com");
        addOutput("output", "  GitHub: github.com/yaq1n0");
        addOutput("output", "  LinkedIn: linkedin.com/in/yaqinhasan");
        addOutput("output", '  CV: <a href="/cv.pdf" style="color: var(--color-accent);">Download CV</a>');
      }
    },
    {
      name: "echo",
      description: "Print arguments to the terminal",
      execute: (args) => {
        addOutput("output", args.join(" "));
      }
    },
    {
      name: "date",
      description: "Display current date and time",
      execute: () => {
        const now = new Date();
        addOutput(
          "output",
          now.toLocaleString("en-GB", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })
        );
      }
    }
  ];

  const navCommands: Command[] = [
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
        addOutput("output", "  <span style='color: var(--color-accent);'>cv</span>          Download CV");

        if (isDevMode) {
          addOutput("output", "");
          addOutput("output", "  <span style='color: var(--color-dev);'>debug</span>        Debug page [dev]");
          addOutput("output", "  <span style='color: var(--color-dev);'>debug-carousel</span> Carousel debug [dev]");
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
        const validPaths = ["/", "/home", "/about", "/experience", "/projects", "/interests", "/cv"];

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
          addOutput("info", "Try 'tree' to see available pages");
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

  const devCommand: Command = {
    name: "dev",
    description: "Toggle developer mode (use --enable or --disable)",
    execute: (args) => {
      if (args.length === 0) {
        addOutput("info", `Developer mode is currently: <strong>${isDevMode ? "ENABLED" : "DISABLED"}</strong>`);
        addOutput("output", "Usage: dev --enable | dev --disable");
        return;
      }

      const flag = args[0].toLowerCase();

      if (flag === "--enable" || flag === "-e") {
        if (isDevMode) {
          addOutput("info", "Developer mode is already enabled");
        } else {
          toggleDevMode();
          addOutput("success", "✓ Developer mode ENABLED");
          addOutput("info", "Additional developer content is now visible");
        }
      } else if (flag === "--disable" || flag === "-d") {
        if (!isDevMode) {
          addOutput("info", "Developer mode is already disabled");
        } else {
          toggleDevMode();
          addOutput("success", "✓ Developer mode DISABLED");
          addOutput("info", "Developer content hidden");
        }
      } else if (flag === "--status" || flag === "-s") {
        addOutput("info", `Status: ${isDevMode ? "ENABLED" : "DISABLED"}`);
      } else {
        addOutput("error", `Unknown flag: ${flag}`);
        addOutput("output", "Usage: dev --enable | dev --disable | dev --status");
      }
    }
  };

  const themeCommand: Command = {
    name: "theme",
    description: "Manage themes (list, set <theme>, variant <name>, mode <light|dark>, toggle)",
    aliases: ["th"],
    execute: (args) => {
      if (!theme) {
        addOutput("error", "Theme management not available");
        return;
      }
      executeThemeCommand(args, theme, addOutput);
    }
  };

  return [...simpleCommands, ...navCommands, devCommand, themeCommand];
}
